import { InventoryItem } from "./InventoryItem"

export interface Inventory {
  address: string
  latitude: number
  longitude: number
  items: { [key: string]: InventoryItem }
  accountUsername: string
}
