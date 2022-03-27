import { InventoryItemModel, InventoryItemEntity } from "./InventoryItem"

export class DistancedInventoryItemEntity {
  distance: number // distance in KM from the reference point
  inventoryItem: InventoryItemEntity
  referenceLat: number
  referenceLng: number

  constructor(model: DistancedInventoryItemModel) {
    this.distance = model.distance
    this.inventoryItem = new InventoryItemEntity(model.inventoryItem)
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
