import { InventoryItem } from "../models/InventoryItem"
export interface DistancedInventoryItem {
  owningAccountUsername: string
  inventoryItem: InventoryItem
  distance: number // distance in KM from the reference point
  referenceLat: number
  referenceLng: number
}
