export type QuantityName = "None" | "A Little" | "Some" | "A Lot"

export class QuantityEntity {
  name: QuantityName
  value: number

  constructor(name: QuantityName, value: number) {
    this.name = name
    this.value = value
  }

  static fromName(name: QuantityName): QuantityEntity {
    switch (name) {
      case "None":
        return new QuantityEntity(name, 0)
      case "A Little":
        return new QuantityEntity(name, 1)
      case "Some":
        return new QuantityEntity(name, 2)
      case "A Lot":
        return new QuantityEntity(name, 3)
      default:
        return QuantityEntity.fromName("None")
    }
  }

  static fromValue(value: number): QuantityEntity {
    switch (value) {
      case 0:
        return new QuantityEntity("None", value)
      case 1:
        return new QuantityEntity("A Little", value)
      case 2:
        return new QuantityEntity("Some", value)
      case 3:
        return new QuantityEntity("A Lot", value)
      default:
        return QuantityEntity.fromName("None")
    }
  }
}
