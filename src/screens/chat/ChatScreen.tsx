import React, { useContext } from "react"
import { AccountEntity } from "../../api/models/Account"
import { Connection } from "../../api/models/Connection"
import { AccountContext } from "../../contexts/AccountContext"
import ChatInfoBar from "./ChatInfoBar"
import { ChatMain } from "./ChatMain"
import { ConversationProvider } from "./ConversationContext"

interface Props {
  route: {
    params: {
      connection: Connection
      partnerAccount: AccountEntity
    }
  }
}

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
