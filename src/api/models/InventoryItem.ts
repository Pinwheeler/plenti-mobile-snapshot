import { DateTime } from "luxon";
import uuid from "react-native-uuid";
import { Quantity } from "./Quantity";

export class InventoryItemEntity {
  id: string;
  plentiItemName: string;
  currentQuantity: Quantity;
  initialQuantity: Quantity;
  createdAt: DateTime;
  updatedAt: DateTime;

  static modelFromUI(
    itemName: string,
    quantity: Quantity
  ): InventoryItemModel {
    return {
      id: uuid.v4().toString(),
      plentiItemName: itemName,
      currentQuantity: quantity,
      initialQuantity: quantity,
      createdAt: DateTime.now().toISO(),
      updatedAt: DateTime.now().toISO(),
    };
  }

  constructor(model: InventoryItemModel) {
    this.id = model.id;
    this.plentiItemName = model.plentiItemName;
    this.currentQuantity = model.currentQuantity;
    this.initialQuantity = model.initialQuantity;
    this.createdAt = DateTime.fromISO(model.createdAt);
    this.updatedAt = DateTime.fromISO(model.updatedAt);
  }
}

export interface InventoryItemModel {
  id: string;
  plentiItemName: string;
  currentQuantity: Quantity;
  initialQuantity: Quantity;
  createdAt: string;
  updatedAt: string;
}
