export type PlentiType =
  | "Fruit"
  | "Decorative"
  | "Herb"
  | "Poultry"
  | "Vegetable"
  | "Unknown";

export class PlentiItemEntity {
  id: number;
  title: string;
  type: PlentiType;
  displayName: string;
  filename: string;

  constructor(model: PlentiItemModel) {
    this.id = model.id;
    this.title = model.title;
    this.type = model.type;
    this.displayName = this.title.charAt(0).toUpperCase() + this.title.slice(1);
    this.filename = model.filename;
  }

  toModel(): PlentiItemModel {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      filename: this.title,
    };
  }
}

export interface PlentiItemModel {
  id: number;
  type: PlentiType;
  title: string;
  filename: string;
}
