import { Quantity } from "./Quantity"

export interface PlentiWatcher {
  plentiItemName: string
  quantity: Quantity
  latitude: number
  longitude: number
  accountUid: string
  maxDistanceInKM: number
}
