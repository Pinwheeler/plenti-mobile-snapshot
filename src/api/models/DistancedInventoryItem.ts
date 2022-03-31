import { InventoryItemModel, InventoryItem } from "./InventoryItem"

export class DistancedInventoryItemEntity {
  distance: number // distance in KM from the reference point
  inventoryItem: InventoryItem
  referenceLat: number
  referenceLng: number

  constructor(model: DistancedInventoryItemModel) {
    this.distance = model.distance
    this.inventoryItem = new InventoryItem(model.inventoryItem)
    this.referenceLat = model.referenceLat
    this.referenceLng = model.referenceLng
  }
}

export interface DistancedInventoryItemModel {
  distance: number
  inventoryItem: InventoryItemModel
  referenceLat: number
  referenceLng: number
}
