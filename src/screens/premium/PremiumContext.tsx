import { LoggedInAccountEntity } from "plenti-api"
import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { AppState } from "react-native"
import IapHub from "react-native-iaphub"
import { LoggerService } from "src/lib/LoggerService"
import DeviceContext from "src/shared/DeviceContext"
import { SimulatorProductAnnually, SimulatorProductMonthly } from "./mock_data/SimulatorProducts"

interface IPremiumContext {
  hasPremium: boolean
  premiumLoading: boolean //these two values could be a promise, but we don't want to invalidate premium users on every app refresh
  useAccount: (account?: LoggedInAccountEntity) => void
  products: IapHub.IapHubProductInformation[]
  activeProducts: IapHub.IapHubProductInformation[]
  purchaseProduct: (product: IapHub.IapHubProductInformation) => void
  logout: VoidFunction
}

const PremiumContext = React.createContext({} as IPremiumContext)

const PremiumProvider: React.FC = (props) => {
  const { isEmulator } = useContext(DeviceContext)
  const [hasPremium, setHasPremium] = useState<boolean>(false)
  const [premiumLoading, setPremiumLoading] = useState(false)
  const [products, setProducts] = useState<IapHub.IapHubProductInformation[]>([])
  const [activeProducts, setActiveProducts] = useState<IapHub.IapHubProductInformation[]>([])
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange)

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange)
    }
  }, [])

  const _handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      refreshHasPremium()
    }

    appState.current = nextAppState
  }

  const iapHubInitPromise = useMemo(() => {
    return IapHub.init({
      appId: "5f03e965cdf7c10e86952ceb",
      apiKey: "J4CMKLwUbvODdG0uYAS3xFfdjoaH4vZ3",
      environment: "production",
    }).catch((error) => {
      LoggerService.instance().error(error, "IAPHUB Init error")
    })
  }, [])

  const loadProducts = async () => {
    if (isEmulator) {
      setProducts([SimulatorProductMonthly, SimulatorProductAnnually])
    } else {
      const fetchedProducts = await IapHub.getProductsForSale()
      setProducts(fetchedProducts)
    }
  }

  useEffect(() => {}, [])

  const refreshHasPremium = () => {
    setPremiumLoading(true)
    if (isEmulator) {
      // start off without any premium products when not on physical device
      setActiveProducts([])
      setHasPremium(false)
      setPremiumLoading(false)
    } else {
      IapHub.getActiveProducts()
        .then((products) => {
          setActiveProducts(products)
          setHasPremium(products.length > 0)
        })
        .finally(() => {
          setPremiumLoading(false)
        })
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const useAccount = async (account?: LoggedInAccountEntity) => {
    await iapHubInitPromise
    if (isEmulator) {
      refreshHasPremium()
    } else {
      try {
        if (account) {
          await IapHub.setUserId(account.iapId)
          refreshHasPremium()
          await loadProducts()
        } else {
          await IapHub.setUserId(null)
          setActiveProducts([])
        }
      } catch (error) {
        LoggerService.instance().error(error, "IAPHUB Connection error")
      }
    }
  }

  const purchaseProduct = async (product: IapHub.IapHubProductInformation) => {
    if (isEmulator) {
      // this is an emulator, getting premium just works
      setActiveProducts((oldval) => {
        return [...oldval, product]
      })
      setHasPremium(true)
    } else {
      try {
        await IapHub.buy(product.sku)
        refreshHasPremium()
      } catch (err) {
        LoggerService.instance().error(err, "IAPHUB Purchase Error")
      }
    }
  }

  const logout = () => {
    useAccount(undefined)
  }

  const value = { useAccount, hasPremium, premiumLoading, products, activeProducts, purchaseProduct, logout }

  return <PremiumContext.Provider value={value}>{props.children}</PremiumContext.Provider>
}

export default PremiumContext
export { IPremiumContext, PremiumProvider }
