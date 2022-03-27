export class AWSPresignURLEntity {
  url: string
  expirationDate: Date
  method: string

  constructor(model: AWSPresignedURLModel) {
    this.url = model.url
    this.expirationDate = new Date(model.expirationDateTimestamp)
    this.method = model.method
  }
}

export interface AWSPresignedURLModel {
  url: string
  expirationDateTimestamp: number
  method: string
}
