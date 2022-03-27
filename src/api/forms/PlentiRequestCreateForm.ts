import { PlentiItemEntity } from "../models/PlentiItem"
import { QuantityEntity } from "../models/Quantity"

export interface PlentiRequestCreateForm {
  item: PlentiItemEntity
  quantity: QuantityEntity
  latitude: number
  longitude: number
}
