import { DateTime } from "luxon";
import uuid from "react-native-uuid";
import { Quantity } from "./Quantity";

export class InventoryItemEntity {
  id: string;
  plentiItemId: number;
  currentQuantity: Quantity;
  initialQuantity: Quantity;
  createdAt: DateTime;
  updatedAt: DateTime;

  static modelFromUI(
    itemId: number,
    quantity: Quantity
  ): InventoryItemModel {
    return {
      id: uuid.v4().toString(),
      plentiItemId: itemId,
      currentQuantity: quantity,
      initialQuantity: quantity,
      createdAt: DateTime.now().toISO(),
      updatedAt: DateTime.now().toISO(),
    };
  }

  constructor(model: InventoryItemModel) {
    this.id = model.id;
    this.plentiItemId = model.plentiItemId;
    this.currentQuantity = model.currentQuantity;
    this.initialQuantity = model.initialQuantity;
    this.createdAt = DateTime.fromISO(model.createdAt);
    this.updatedAt = DateTime.fromISO(model.updatedAt);
  }
}

export interface InventoryItemModel {
  id: string;
  plentiItemId: number;
  currentQuantity: Quantity;
  initialQuantity: Quantity;
  createdAt: string;
  updatedAt: string;
}
