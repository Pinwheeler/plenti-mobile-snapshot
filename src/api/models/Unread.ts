export class UnreadEntity {
  connectionId: number
  count: number

  constructor(model: UnreadModel) {
    this.connectionId = model.connectionId
    this.count = model.count
  }

  increment(): UnreadEntity {
    const model = this.toModel()
    model.count += 1
    return new UnreadEntity(model)
  }

  reset() {
    const model = this.toModel()
    model.count = 0
    return new UnreadEntity(model)
  }

  toModel(): UnreadModel {
    return {
      connectionId: this.connectionId,
      count: this.count,
    }
  }
}

export interface UnreadModel {
  connectionId: number
  count: number
}
