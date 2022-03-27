export type ConversationAction = "success" | "failure" | "pickupLocationShared"

export class ConversationEntity {
  identifer: number
  isPickupLocationShared: boolean
  unreadByQuartermasterCount?: number

  constructor(model: ConversationModel) {
    this.identifer = model.id
    this.isPickupLocationShared = model.pickupLocationShared
    this.unreadByQuartermasterCount = model.unreadByQuartermasterCount
  }
}

export interface ConversationModel {
  id: number
  pickupLocationShared: boolean
  unreadByQuartermasterCount?: number
}
