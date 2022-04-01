import React, { useState, useContext } from "react"
import { PlentiItemEntity, QuantityEntity, PlentiRequestCreateForm, PlentiRequestEntity } from "plenti-api"
import ApiContext from "src/shared/ApiContext"
import LocationContext from "../shared/LocationContext"
import ConnectContext from "../connect/ConnectContext"

interface IWantSelectorContext {
  makingRequestPromise?: Promise<PlentiRequestEntity>
  makeRequest: (item: PlentiItemEntity, quantity: QuantityEntity) => void
  clearRequest: VoidFunction
}

const WantSelectorContext = React.createContext({} as IWantSelectorContext)

const WantSelectorProvider: React.FC = (props) => {
  const { plentiRequestService } = useContext(ApiContext)
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

export default WantSelectorContext
export { IWantSelectorContext, WantSelectorProvider }
