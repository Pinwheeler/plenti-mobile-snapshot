import { InventoryItemEntity, InventoryItemModel } from "./InventoryItem"
import { PlentiItemEntity, PlentiItemModel } from "./PlentiItem"
import { QuantityEntity } from "./Quantity"
import { AccountEntity, AccountModel } from "./Account"

export class PlentiRequestEntity {
  id: number
  matches: InventoryItemEntity[]
  plentiItem: PlentiItemEntity
  quantity: QuantityEntity
  account: AccountEntity
  unreadByRequesterCount?: number

  constructor(model?: PlentiRequestModel) {
    if (model === undefined) {
      throw new Error("Couldn't create PlentiRequestEntity, model undefined")
    }
    this.id = model.id
    this.matches = model.matches?.map((item) => new InventoryItemEntity(item)) || []
    this.plentiItem = new PlentiItemEntity(model.plentiItem)
    this.quantity = QuantityEntity.fromValue(model.quantity)
    this.account = new AccountEntity(model.account)
    this.unreadByRequesterCount = model.unreadByRequesterCount
  }
}

export interface PlentiRequestModel {
  id: number
  matches?: InventoryItemModel[]
  plentiItem: PlentiItemModel
  quantity: number
  account: AccountModel
  unreadByRequesterCount?: number
}
