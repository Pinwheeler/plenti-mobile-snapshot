import { Text, useTheme } from "@rneui/themed"
import React, { useContext } from "react"
import { View } from "react-native"
import { ChatMessage } from "../../api/models/ChatMessage"
import { AccountContext } from "../../contexts/AccountContext"

interface Props {
  message: ChatMessage
}

const chatItemStyle = {
  padding: 8,
  marginBottom: 8,
  borderRadius: 8,
}

const ChatItem: React.FC<Props> = (props) => {
  const { loggedInAccount } = useContext(AccountContext)
  const { theme } = useTheme()
  const { message } = props
  if (!loggedInAccount) {
    return null
  }
  const fromMe = loggedInAccount.uid === message.fromAccountUid
  if (fromMe) {
    return (
      <View style={{ flexDirection: "row-reverse" }}>
        <View style={{ ...chatItemStyle, backgroundColor: theme.colors.secondary }}>
          <Text style={{ textAlign: "right" }}>{props.message.text}</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ ...chatItemStyle, backgroundColor: theme.colors.success }}>
          <Text style={{ textAlign: "left" }}>{props.message.text}</Text>
        </View>
      </View>
    )
  }
}

export default ChatItem
