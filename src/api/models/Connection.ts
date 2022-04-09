export interface Connection {
  conversationUid: string
  myUid: string
  partnerUid: string
  iHaveSharedLocation: boolean
  theirPickupLocation?: {
    address: string
    latitude: number
    longitude: number
  }
  unreadMessageCount: number
}
