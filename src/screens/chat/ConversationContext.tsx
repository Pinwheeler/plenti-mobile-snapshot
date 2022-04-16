import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { AccountEntity } from "../../api/models/Account"
import { Connection } from "../../api/models/Connection"
import { Conversation, Message } from "../../api/models/Conversation"
import { BlockedUsers } from "../../api/models/LoggedInAccount"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { AccountContext } from "../../contexts/AccountContext"
import { InventoryContext } from "../../contexts/InventoryContext"
import { handleUnauthenticatedRequest, StringMapFromObj, URLS } from "../../lib/DatabaseHelpers"
import { fromISOTime, toISOTime } from "../../lib/DateHelper"
import { useEffectDebugger } from "../../lib/DebugHelpers"
import { Logger } from "../../lib/Logger"

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
  sequentialMessages: Message[]
  readAllMyMessages(): Promise<any>
  sendMessage(messageText: string): Promise<any>
  reportOffendingAccount(reason: string): Promise<any>
  shareLocation(sharing: boolean): void
  setShareLocationOpen(value: boolean): void
  setOffendingAccount(account?: AccountEntity): void
}

export const ConversationContext = React.createContext({} as IConverstaionContext)

export const ConversationProvider: React.FC<Props> = (props) => {
  const [connection, setConnection] = useState(props.connection)
  const { myInventory } = useContext(InventoryContext)
  const { loggedInAccount } = useContext(AccountContext)
  const [offendingAccount, setOffendingAccount] = useState<AccountEntity>()
  const [conversation, setConversation] = useState<Conversation>()
  const [messageMap, setMessageMap] = useState(new Map<string, Message>())
  const [shareLocationOpen, setShareLocationOpen] = useState(false)
  const theirConnectionPath = `/connections/${connection.partnerUid}/${connection.myUid}`
  const myConnectionPath = `/connections/${connection.myUid}/${connection.partnerUid}`

  useEffectDebugger(() => {
    const onConnectionUpdate = database()
      .ref(myConnectionPath)
      .on("value", (snapshot) => setConnection(snapshot.val()))
    return () => database().ref(myConnectionPath).off("value", onConnectionUpdate)
  }, [myConnectionPath])

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
      .on("value", (snapshot) => setMessageMap(StringMapFromObj(snapshot.val())))
    return () => database().ref(path).off("value", onMessagesUpdate)
  }, [connection])

  const readAllMyMessages = () => database().ref(myConnectionPath).update({ unreadMessageCount: 0 })

  const sendMessage = (message: string) => {
    if (loggedInAccount) {
      const sendDate = toISOTime(new Date())
      const messageModel: Message = {
        fromAccountUid: loggedInAccount.uid,
        text: message,
        sendDate,
      }
      return Promise.all([
        database()
          .ref(theirConnectionPath)
          .transaction((connection: object) => {
            const copy: Partial<Connection> = { ...connection }
            copy.unreadMessageCount = (copy.unreadMessageCount ?? 0) + 1
            return copy
          }),
        database().ref(`/conversations/${connection.conversationUid}/messages/${sendDate}`).set(messageModel),
      ])
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
        theirPickupLocation: sharing
          ? {
              address: myInventory.address,
              latitude: myInventory.latitude,
              longitude: myInventory.longitude,
            }
          : null,
      }
      return Promise.all([
        database().ref(myConnectionPath).update(myConnectionUpdate),
        database().ref(theirConnectionPath).update(theirConnectionUpdate),
      ])
    }
    return handleUnauthenticatedRequest("shareLocation")
  }

  const sequentialMessages = useMemo(
    () =>
      Array.from(messageMap.entries())
        .sort(([keyA, _valA], [keyB, _valB]) => fromISOTime(keyA).getTime() - fromISOTime(keyB).getTime())
        .map(([_key, value]) => value),
    [messageMap],
  )

  if (!conversation) {
    return <LoadingIndicator thingThatIsLoading="Conversation" />
  }

  const value = {
    conversation,
    connection,
    shareLocationOpen,
    partnerAccount: props.partnerAccount,
    offendingAccount,
    sequentialMessages,
    readAllMyMessages,
    shareLocation,
    setShareLocationOpen,
    setOffendingAccount,
    reportOffendingAccount,
    sendMessage,
  }

  return <ConversationContext.Provider value={value}>{props.children}</ConversationContext.Provider>
}
