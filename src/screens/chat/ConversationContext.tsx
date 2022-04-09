import React, { useContext, useEffect, useState } from "react"
import { Connection } from "../../api/models/Connection"
import { Conversation } from "../../api/models/Conversation"
import database from "@react-native-firebase/database"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { handleUnauthenticatedRequest, StringMapFromObj, URLS } from "../../lib/DatabaseHelpers"
import { AccountEntity } from "../../api/models/Account"
import { InventoryContext } from "../../contexts/InventoryContext"
import { AccountContext } from "../../contexts/AccountContext"
import { BlockedUsers } from "../../api/models/LoggedInAccount"
import { Logger } from "../../lib/Logger"
import { ChatMessage } from "../../api/models/ChatMessage"
import { toISOTime } from "../../lib/DateHelper"

interface Props {
  connection: Connection
  partnerAccount: AccountEntity
}

interface IConverstaionContext {
  conversation: Conversation
  connection: Connection
  shareLocationOpen: boolean
  partnerAccount: AccountEntity
  offendingAccount?: AccountEntity
  messages: Map<string, ChatMessage>
  sendMessage(messageText: string): Promise<any>
  reportOffendingAccount(reason: string): Promise<any>
  shareLocation(sharing: boolean): void
  setShareLocationOpen(value: boolean): void
  setOffendingAccount(account?: AccountEntity): void
}

export const ConversationContext = React.createContext({} as IConverstaionContext)

export const ConversationProvider: React.FC<Props> = (props) => {
  const { connection } = props
  const { myInventory } = useContext(InventoryContext)
  const { loggedInAccount } = useContext(AccountContext)
  const [offendingAccount, setOffendingAccount] = useState<AccountEntity>()
  const [conversation, setConversation] = useState<Conversation>()
  const [messages, setMessages] = useState(new Map<string, ChatMessage>())
  const [shareLocationOpen, setShareLocationOpen] = useState(false)
  const theirConnectionPath = `/connections/${connection.partnerUid}/${connection.myUid}`
  const myConnectionPath = `/connections/${connection.myUid}/${connection.partnerUid}`

  useEffect(() => {
    const path = `/conversations/${connection.conversationUid}`
    const onConversationUpdate = database()
      .ref(path)
      .on("value", (snapshot) => setConversation(snapshot.val()))
    return () => database().ref(path).off("value", onConversationUpdate)
  }, [connection])

  useEffect(() => {
    const path = `/conversations/${connection.conversationUid}/messages`
    const onMessagesUpdate = database()
      .ref(path)
      .on("value", (snapshot) => setMessages(StringMapFromObj(snapshot.val())))
    return () => database().ref(path).off("value", onMessagesUpdate)
  })

  const sendMessage = (message: string) => {
    if (loggedInAccount) {
      const sentDate = toISOTime(new Date())
      const messageModel: ChatMessage = {
        fromAccountUid: loggedInAccount.uid,
        text: message,
        read: false,
        sentDate,
      }
      return database().ref(`/conversations/${connection.conversationUid}/messages/${sentDate}`).set(messageModel)
    }
    return handleUnauthenticatedRequest("sendMessage")
  }

  const reportOffendingAccount = (reason: string) => {
    if (loggedInAccount) {
      if (offendingAccount) {
        const blockedUsersUpdate: BlockedUsers = {}
        blockedUsersUpdate[offendingAccount.uid] = { uid: offendingAccount.uid, reason }
        return database()
          .ref(`${URLS.account.secure(loggedInAccount)}/blockedUsers`)
          .update(blockedUsersUpdate)
      }
      const failureReason = "No offending account selected while trying to report. Something is fishy"
      Logger.error(failureReason)
      return Promise.reject(failureReason)
    }
    return handleUnauthenticatedRequest("reportOffendingAccount")
  }

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
    messages,
    shareLocation,
    setShareLocationOpen,
    setOffendingAccount,
    reportOffendingAccount,
    sendMessage,
  }

  return <ConversationContext.Provider value={value}>{props.children}</ConversationContext.Provider>
}
