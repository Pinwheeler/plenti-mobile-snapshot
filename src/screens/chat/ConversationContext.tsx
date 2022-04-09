import React, { useContext, useEffect, useState } from "react"
import { Connection } from "../../api/models/Connection"
import { Conversation } from "../../api/models/Conversation"
import database from "@react-native-firebase/database"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { handleUnauthenticatedRequest, URLS } from "../../lib/DatabaseHelpers"
import { AccountContext } from "../../contexts/AccountContext"
import { AccountEntity } from "../../api/models/Account"

interface Props {
  connection: Connection
  partnerAccount: AccountEntity
}

interface IConverstaionContext {
  conversation: Conversation
  connection: Connection
  shareLocationOpen: boolean
  partnerAccount: AccountEntity
  shareLocation(sharing: boolean): void
  setShareLocationOpen(value: boolean): void
}

export const ConversationContext = React.createContext({} as IConverstaionContext)

export const ConversationProvider: React.FC<Props> = (props) => {
  const { connection } = props
  const { loggedInAccount } = useContext(AccountContext)
  const [conversation, setConversation] = useState<Conversation>()
  const [shareLocationOpen, setShareLocationOpen] = useState(false)
  const theirConnectionPath = `/connections/${connection.partnerUid}/${connection.myUid}`
  const myConnectionPath = `/connections/${connection.myUid}/${connection.partnerUid}`

  useEffect(() => {
    const path = `/conversations/${connection.conversationUid}`
    const onConversationUpdate = database()
      .ref(path)
      .on("value", (snapshot) => setConversation(snapshot.val()))
    return () => database().ref("value").off("value", onConversationUpdate)
  }, [connection])

  const shareLocation = (sharing: boolean) => {
    if (loggedInAccount && loggedInAccount.pickupAddress && loggedInAccount.latitude && loggedInAccount.longitude) {
      const myConnectionUpdate: Partial<Connection> = { iHaveSharedLocation: sharing }
      const theirConnectionUpdate: Partial<Connection> = {
        theirPickupLocation: {
          address: loggedInAccount.pickupAddress,
          latitude: loggedInAccount.latitude,
          longitude: loggedInAccount.longitude,
        },
      }
      return Promise.all([
        database().ref(myConnectionPath).update(myConnectionUpdate),
        database().ref(theirConnectionPath).update(theirConnectionUpdate),
      ])
    }
    return handleUnauthenticatedRequest("shareLocation")
  }

  if (!conversation) {
    return <LoadingIndicator thingThatIsLoading="Conversation" />
  }

  const value = {
    conversation,
    connection,
    shareLocationOpen,
    shareLocation,
    setShareLocationOpen,
    partnerAccount: props.partnerAccount,
  }

  return <ConversationContext.Provider value={value}>{props.children}</ConversationContext.Provider>
}
