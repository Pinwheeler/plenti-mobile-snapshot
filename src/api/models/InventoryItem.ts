import { DateTime } from "luxon";
import uuid from "react-native-uuid";
import { PlentiItemEntity, PlentiItemModel } from "./PlentiItem";
import { Quantity } from "./Quantity";

export class InventoryItemEntity {
  id: string;
  plentiItem: PlentiItemEntity;
  currentQuantity: Quantity;
  initialQuantity: Quantity;
  createdAt: DateTime;
  updatedAt: DateTime;

  static modelFromUI(
    item: PlentiItemEntity,
    quantity: Quantity
  ): InventoryItemModel {
    return {
      id: uuid.v4().toString(),
      plentiItem: item.toModel(),
      currentQuantity: quantity,
      initialQuantity: quantity,
      createdAt: DateTime.now().toISO(),
      updatedAt: DateTime.now().toISO(),
    };
  }

  constructor(model: InventoryItemModel) {
    this.id = model.id;
    this.plentiItem = new PlentiItemEntity(model.plentiItem);
    this.currentQuantity = model.currentQuantity;
    this.initialQuantity = model.initialQuantity;
    this.createdAt = DateTime.fromISO(model.createdAt);
    this.updatedAt = DateTime.fromISO(model.updatedAt);
  }
}

export interface InventoryItemModel {
  id: string;
  plentiItem: PlentiItemModel;
  currentQuantity: Quantity;
  initialQuantity: Quantity;
  createdAt: string;
  updatedAt: string;
}
