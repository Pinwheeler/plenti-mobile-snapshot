import React, { useState, useContext } from "react"
import { PlentiRequestEntity } from "../../api/models/PlentiRequest"
import { Quantity } from "../../api/models/Quantity"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import LocationContext from "../../contexts/LocationContext"

interface IWantSelectorContext {
  makingRequestPromise?: Promise<PlentiRequestEntity>
  makeRequest: (item: PlentiItem, quantity: Quantity) => void
  clearRequest(): void
}

const WantSelectorContext = React.createContext({} as IWantSelectorContext)

const WantSelectorProvider: React.FC = (props) => {
  const { getCurrentPosition } = useContext(LocationContext)
  const { refresh: refreshWants } = useContext(ConnectContext)
  const [makingRequestPromise, setMakingRequestPromise] = useState<Promise<PlentiRequestEntity> | undefined>()

  const makeRequest = (item: PlentiItemEntity, quantity: QuantityEntity) => {
    getCurrentPosition().then((position) => {
      const plentiRequestCreateForm: PlentiRequestCreateForm = {
        item,
        quantity,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      const promise = plentiRequestService.create(plentiRequestCreateForm)
      promise.then(() => {
        refreshWants()
      })
      setMakingRequestPromise(promise)
    })
  }
  const clearRequest = () => {
    setMakingRequestPromise(undefined)
  }

  const value = {
    makingRequestPromise,
    makeRequest,
    clearRequest,
  }

  return <WantSelectorContext.Provider value={value}>{props.children}</WantSelectorContext.Provider>
}
