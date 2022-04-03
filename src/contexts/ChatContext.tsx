import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useState } from "react"
import uuid from "react-native-uuid"
import { Connection } from "../api/models/Connection"
import { Conversation } from "../api/models/Conversation"
import { InventoryItem } from "../api/models/InventoryItem"
import { handleUnauthenticatedRequest, URLS } from "../lib/DatabaseHelpers"
import { AccountContext } from "./AccountContext"

interface IChatContext {
  createConnection(inventoryItem: InventoryItem): Promise<any>
  unreadCount: number
}

export const ChatContext = React.createContext({} as IChatContext)

export const ChatProvider: React.FC = (props) => {
  const { loggedInAccount } = useContext(AccountContext)
  const [myConnections, setMyConnections] = useState(new Map<string, Connection>())

  useEffect(() => {
    if (loggedInAccount) {
      const onConnectionsChange = database()
        .ref(URLS.connectionsForAccount(loggedInAccount))
        .on("value", (snapshot) => setMyConnections(new Map<string, Connection>(snapshot.val())))
      return () => database().ref(URLS.connectionsForAccount(loggedInAccount)).off("value", onConnectionsChange)
    }
  }, [loggedInAccount])

  const value = {
    unreadCount: Array.from(myConnections.values())
      .map((con) => con.unreadMessageCount)
      .reduce((a, b) => a + b),
    createConnection: (inventoryItem: InventoryItem) => {
      if (loggedInAccount) {
        const conversation: Conversation = {
          uid: uuid.v4().toString(),
          messages: {},
        }
        const myConnection: Connection = {
          myUid: loggedInAccount.uid,
          partnerUid: inventoryItem.accountUid,
          conversationUid: conversation.uid,
          iHaveSharedLocation: false,
          theyHaveSharedLocation: false,
          unreadMessageCount: 0,
        }
        const theirConnection: Connection = {
          myUid: inventoryItem.accountUid,
          partnerUid: loggedInAccount.uid,
          conversationUid: conversation.uid,
          iHaveSharedLocation: false,
          theyHaveSharedLocation: false,
          unreadMessageCount: 0,
        }
        return Promise.all([
          database()
            .ref(URLS.connectionsForAccount(loggedInAccount) + `/${inventoryItem.accountUid}`)
            .set(myConnection),
          database().ref(`/connections/${inventoryItem.uid}/${loggedInAccount.uid}`).set(theirConnection),
          database().ref(`conversations/${conversation.uid}`).set(conversation),
        ])
      }
      return handleUnauthenticatedRequest("updateAccount")
    },
  }

  return <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
}
