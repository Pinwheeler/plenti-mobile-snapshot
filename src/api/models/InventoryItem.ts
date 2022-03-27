import { PlentiItemEntity, PlentiItemModel } from "./PlentiItem"
import { QuantityEntity } from "./Quantity"
import { AccountEntity, AccountModel } from "./Account"

export class InventoryItemEntity {
  id: number
  plentiItem: PlentiItemEntity
  currentQuantity: QuantityEntity
  initialQuantity: QuantityEntity
  account: AccountEntity
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  constructor(model: InventoryItemModel) {
    this.id = model.id
    this.plentiItem = new PlentiItemEntity(model.plentiItem)
    this.currentQuantity = QuantityEntity.fromValue(model.currentQuantity)
    this.initialQuantity = QuantityEntity.fromValue(model.initialQuantity)
    this.account = new AccountEntity(model.account)
    this.createdAt = new Date(model.createdAt)
    this.updatedAt = new Date(model.updatedAt)
    if (model.deletedAt) {
      this.deletedAt = new Date(model.deletedAt)
    }
  }
}

export interface InventoryItemModel {
  id: number
  plentiItem: PlentiItemModel
  currentQuantity: number
  initialQuantity: number
  account: AccountModel
  createdAt: string
  updatedAt: string
  deletedAt?: string
}
