import React, { useContext, useEffect, useState } from "react"
import { Connection } from "../../api/models/Connection"
import { Conversation } from "../../api/models/Conversation"
import database from "@react-native-firebase/database"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { handleUnauthenticatedRequest, URLS } from "../../lib/DatabaseHelpers"
import { AccountContext } from "../../contexts/AccountContext"
import { AccountEntity } from "../../api/models/Account"
import { InventoryContext } from "../../contexts/InventoryContext"

interface Props {
  connection: Connection
  partnerAccount: AccountEntity
}

interface IConverstaionContext {
  conversation: Conversation
  connection: Connection
  shareLocationOpen: boolean
  partnerAccount: AccountEntity
  offendingAccout?: AccountEntity
  shareLocation(sharing: boolean): void
  setShareLocationOpen(value: boolean): void
  setOffendingAccount(account?: AccountEntity): void
}

export const ConversationContext = React.createContext({} as IConverstaionContext)

export const ConversationProvider: React.FC<Props> = (props) => {
  const { connection } = props
  const { myInventory } = useContext(InventoryContext)
  const [offendingAccount, setOffendingAccount] = useState<AccountEntity>()
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
    if (myInventory) {
      const myConnectionUpdate: Partial<Connection> = { iHaveSharedLocation: sharing }
      const theirConnectionUpdate: Partial<Connection> = {
        theirPickupLocation: {
          address: myInventory.address,
          latitude: myInventory.latitude,
          longitude: myInventory.longitude,
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
    partnerAccount: props.partnerAccount,
    offendingAccount,
    shareLocation,
    setShareLocationOpen,
    setOffendingAccount,
  }

  return <ConversationContext.Provider value={value}>{props.children}</ConversationContext.Provider>
}
