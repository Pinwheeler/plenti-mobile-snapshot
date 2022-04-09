export interface ChatMessage {
  fromAccountUid: string
  text: string
  sentDate: string //ISO (also the PK)
  read: boolean
}
