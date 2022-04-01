import uuid from "react-native-uuid"
import { fromISOTime, toISOTime } from "../../lib/DateHelper"
import { AccountEntity } from "./Account"
import { Quantity } from "./Quantity"

export class InventoryItem {
  uid: string
  plentiItemName: string
  quantity: Quantity
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
  accountUid: string

  static modelFromUI(
    itemName: string,
    quantity: Quantity,
    account: AccountEntity,
    imageUrl?: string,
  ): InventoryItemModel {
    return {
      uid: uuid.v4().toString(),
      plentiItemName: itemName,
      quantity,
      createdAt: toISOTime(new Date()),
      updatedAt: toISOTime(new Date()),
      accountUid: account.uid,
      imageUrl,
    }
  }

  constructor(model: InventoryItemModel) {
    this.uid = model.uid
    this.plentiItemName = model.plentiItemName
    this.quantity = model.quantity
    this.createdAt = fromISOTime(model.createdAt)
    this.updatedAt = fromISOTime(model.createdAt)
    this.accountUid = model.accountUid
    this.imageUrl = model.imageUrl
  }
}

export interface InventoryItemModel {
  uid: string
  plentiItemName: string
  quantity: Quantity
  imageUrl?: string
  createdAt: string
  updatedAt: string
  accountUid: string
}
