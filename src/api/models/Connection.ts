export interface Connection {
  conversationUid: string
  myUid: string
  partnerUid: string
  iHaveSharedLocation: boolean
  theyHaveSharedLocation: boolean
  unreadMessageCount: number
}
