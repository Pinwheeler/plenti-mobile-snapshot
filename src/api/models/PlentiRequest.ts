import { AccountEntity, AccountModel } from "./Account"
import { InventoryItem, InventoryItemModel } from "./InventoryItem"
import { Quantity } from "./Quantity"

export class PlentiRequestEntity {
  uid: string
  matches: InventoryItem[]
  plentiItemName: string
  quantity: Quantity
  account: AccountEntity
  unreadByRequesterCount?: number

  constructor(model?: PlentiRequestModel) {
    if (model === undefined) {
      throw new Error("Couldn't create PlentiRequestEntity, model undefined")
    }
    this.uid = model.uid
    this.matches = model.matches?.map((item) => new InventoryItem(item)) || []
    this.plentiItemName = model.plentiItemName
    this.quantity = model.quantity
    this.account = new AccountEntity(model.account)
    this.unreadByRequesterCount = model.unreadByRequesterCount
  }
}

export interface PlentiRequestModel {
  uid: string
  matches?: InventoryItemModel[]
  plentiItemName: string
  quantity: Quantity
  account: AccountModel
  unreadByRequesterCount?: number
}
