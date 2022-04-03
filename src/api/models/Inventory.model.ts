import { InventoryItem } from "./InventoryItem"

export interface Inventory {
  address: string
  latitude: number
  longitude: number
  items: Map<string, InventoryItem>
  accountUsername: string
}
