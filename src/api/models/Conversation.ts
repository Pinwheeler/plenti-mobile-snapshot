export interface Conversation {
  uid: string
  messages: { [key: string]: Message } // key is send time as ISO
}

export interface Message {
  fromAccountUid: string
  text: string
  sendDate: string // ISO time
}
