export interface ImageModel {
  id: number
  key: string
}

export class ImageEntity implements ImageModel {
  id: number
  key: string

  constructor(model: ImageModel) {
    this.id = model.id
    this.key = model.key
  }
}
