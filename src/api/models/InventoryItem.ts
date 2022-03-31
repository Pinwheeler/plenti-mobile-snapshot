import { DateTime } from "luxon"
import uuid from "react-native-uuid"
import { AccountEntity } from "./Account"
import { Quantity } from "./Quantity"

export class InventoryItem {
  uid: string
  plentiItemName: string
  quantity: Quantity
  imageUrl?: string
  createdAt: DateTime
  updatedAt: DateTime
  accountUid: string

  static modelFromUI(itemName: string, quantity: Quantity, account: AccountEntity): InventoryItemModel {
    return {
      uid: uuid.v4().toString(),
      plentiItemName: itemName,
      quantity,
      createdAt: DateTime.now().toISO(),
      updatedAt: DateTime.now().toISO(),
      accountUid: account.uid,
    }
  }

  constructor(model: InventoryItemModel) {
    this.uid = model.uid
    this.plentiItemName = model.plentiItemName
    this.quantity = model.quantity
    this.createdAt = DateTime.fromISO(model.createdAt)
    this.updatedAt = DateTime.fromISO(model.updatedAt)
    this.accountUid = model.accountUid
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
