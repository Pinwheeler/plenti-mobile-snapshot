import React, { useEffect, useMemo, useRef, useState } from "react"
import { AppState } from "react-native"
import IapHub from "react-native-iaphub"
import { LoggedInAccountEntity } from "../api/models/LoggedInAccount"
import { Logger } from "../lib/Logger"
import { SimulatorProductMonthly, SimulatorProductAnnually } from "../screens/premium/mock_data/SimulatorProducts"

interface IPremiumContext {
  hasPremium: boolean
  premiumLoading: boolean //these two values could be a promise, but we don't want to invalidate premium users on every app refresh
  useAccount: (account?: LoggedInAccountEntity) => void
  products: IapHub.IapHubProductInformation[]
  activeProducts: IapHub.IapHubProductInformation[]
  purchaseProduct: (product: IapHub.IapHubProductInformation) => void
  logout(): void
}

export const PremiumContext = React.createContext({} as IPremiumContext)

export const PremiumProvider: React.FC = (props) => {
  const [hasPremium, setHasPremium] = useState<boolean>(false)
  const [premiumLoading, setPremiumLoading] = useState(false)
  const [products, setProducts] = useState<IapHub.IapHubProductInformation[]>([])
  const [activeProducts, setActiveProducts] = useState<IapHub.IapHubProductInformation[]>([])
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        refreshHasPremium()
      }

      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [])

  const iapHubInitPromise = useMemo(() => {
    return IapHub.init({
      appId: "5f03e965cdf7c10e86952ceb",
      apiKey: "J4CMKLwUbvODdG0uYAS3xFfdjoaH4vZ3",
      environment: __DEV__ ? "development" : "production",
    }).catch((error) => {
      Logger.error(error)
    })
  }, [])

  const loadProducts = async () => {
    if (__DEV__) {
      setProducts([SimulatorProductMonthly, SimulatorProductAnnually])
    } else {
      const fetchedProducts = await IapHub.getProductsForSale()
      setProducts(fetchedProducts)
    }
  }

  useEffect(() => {}, [])

  const refreshHasPremium = () => {
    setPremiumLoading(true)
    if (__DEV__) {
      // start off without any premium products when in dev mode
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
    if (__DEV__) {
      refreshHasPremium()
    } else {
      try {
        if (account) {
          await IapHub.setUserId(account.iapId)
          refreshHasPremium()
          await loadProducts()
        } else {
          setActiveProducts([])
        }
      } catch (error: any) {
        Logger.error(error)
      }
    }
  }

  const purchaseProduct = async (product: IapHub.IapHubProductInformation) => {
    if (__DEV__) {
      // this is an emulator, getting premium just works
      setActiveProducts((oldval) => {
        return [...oldval, product]
      })
      setHasPremium(true)
    } else {
      try {
        await IapHub.buy(product.sku)
        refreshHasPremium()
      } catch (err: any) {
        Logger.error(err)
      }
    }
  }

  const logout = () => {
    useAccount(undefined)
  }

  const value = { useAccount, hasPremium, premiumLoading, products, activeProducts, purchaseProduct, logout }

  return <PremiumContext.Provider value={value}>{props.children}</PremiumContext.Provider>
}
