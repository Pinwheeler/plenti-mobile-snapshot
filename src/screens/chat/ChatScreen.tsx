import React, { useContext } from "react"
import { AccountEntity } from "../../api/models/Account"
import { Connection } from "../../api/models/Connection"
import { AccountContext } from "../../contexts/AccountContext"
import ChatInfoBar from "./ChatInfoBar"
import { ChatMain } from "./ChatMain"
import { ConversationProvider } from "./ConversationContext"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParams } from "../../nav/HomeStack"

type Props = NativeStackScreenProps<RootStackParams, "Chat">

export const ChatScreen: React.FC<Props> = (props) => {
  const { loggedInAccount } = useContext(AccountContext)
  if (!loggedInAccount) {
    return null
  }
  const connection: Connection = props.route.params.connection
  const partnerAccount: AccountEntity = props.route.params.partnerAccount

  return (
    <ConversationProvider connection={connection} partnerAccount={partnerAccount}>
      <ChatInfoBar />
      <ChatMain />
    </ConversationProvider>
  )
}
