import { DateTime } from "luxon"
import uuid from "react-native-uuid"
import { Quantity } from "./Quantity"

export class InventoryItem {
  id: string
  plentiItemName: string
  quantity: Quantity
  imageUrl?: string
  createdAt: DateTime
  updatedAt: DateTime

  static modelFromUI(itemName: string, quantity: Quantity): InventoryItemModel {
    return {
      id: uuid.v4().toString(),
      plentiItemName: itemName,
      quantity,
      createdAt: DateTime.now().toISO(),
      updatedAt: DateTime.now().toISO(),
    }
  }

  constructor(model: InventoryItemModel) {
    this.id = model.id
    this.plentiItemName = model.plentiItemName
    this.quantity = model.quantity
    this.createdAt = DateTime.fromISO(model.createdAt)
    this.updatedAt = DateTime.fromISO(model.updatedAt)
  }
}

export interface InventoryItemModel {
  id: string
  plentiItemName: string
  quantity: Quantity
  imageUrl?: string
  createdAt: string
  updatedAt: string
}
