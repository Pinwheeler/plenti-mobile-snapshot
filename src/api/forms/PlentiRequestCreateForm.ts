import { PlentiItem } from "../../assets/PlentiItemsIndex"
import { Quantity } from "../models/Quantity"

export interface PlentiRequestCreateForm {
  item: PlentiItem
  quantity: Quantity
  latitude: number
  longitude: number
}
