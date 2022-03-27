export type PlentiType = "Fruit" | "Decorative" | "Herb" | "Poultry" | "Vegetable" | "Unknown"

export class PlentiItemEntity {
  id: number
  title: string
  type: PlentiType
  displayName: string
  filename: string

  constructor(model: PlentiItemModel) {
    this.id = model.id
    this.title = model.title
    switch (model.hType) {
      case 1:
        this.type = "Fruit"
        break
      case 2:
        this.type = "Decorative"
        break
      case 3:
        this.type = "Herb"
        break
      case 4:
        this.type = "Poultry"
        break
      case 5:
        this.type = "Vegetable"
        break
      default:
        this.type = "Unknown"
        break
    }

    this.displayName = this.title.charAt(0).toUpperCase() + this.title.slice(1)
    this.filename = model.filename
  }
}

export interface PlentiItemModel {
  id: number
  hType: number
  title: string
  filename: string
}
