import uuid from "react-native-uuid"
import { toISOTime } from "../../lib/DateHelper"
import { AccountEntity } from "./Account"
import { Quantity } from "./Quantity"

export interface InventoryItem {
  uid: string
  plentiItemName: string
  quantity: Quantity
  imageUrl?: string
  createdAt: string // ISO string
  updatedAt: string // ISO string
  accountUid: string
}

export const inventoryItemFromUI = (
  itemName: string,
  quantity: Quantity,
  account: AccountEntity,
  imageUrl?: string,
): InventoryItem => ({
  uid: uuid.v4().toString(),
  plentiItemName: itemName,
  quantity,
  createdAt: toISOTime(new Date()),
  updatedAt: toISOTime(new Date()),
  accountUid: account.uid,
  imageUrl,
})
