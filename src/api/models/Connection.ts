import { AccountEntity, AccountModel } from "./Account"
import { ConversationEntity, ConversationModel } from "./Conversation"

export class ConnectionEntity {
  id: number
  conversation?: ConversationEntity
  partnerA: AccountEntity
  partnerB: AccountEntity
  partnerASharedLocation: boolean
  partnerBSharedLocation: boolean

  constructor(model: ConnectionModel) {
    this.id = model.id
    if (model.conversation) {
      this.conversation = new ConversationEntity(model.conversation)
    }
    this.partnerA = new AccountEntity(model.partnerA)
    this.partnerB = new AccountEntity(model.partnerB)
    this.partnerASharedLocation = model.partnerASharedLocation
    this.partnerBSharedLocation = model.partnerBSharedLocation
  }
}

export interface ConnectionModel {
  id: number
  conversation?: ConversationModel
  partnerA: AccountModel
  partnerB: AccountModel
  partnerASharedLocation: boolean
  partnerBSharedLocation: boolean
}