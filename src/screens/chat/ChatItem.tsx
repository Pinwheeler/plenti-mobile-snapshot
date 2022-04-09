import React, { useContext } from "react"
import { ChatMessageEntity } from "plenti-api"
import { Text } from "react-native-paper"
import { View } from "react-native"
import AccountContext from "src/account/AccountContext"
import Theme from "src/lib/Theme"

interface Props {
  message: ChatMessageEntity
}

const chatItemStyle = {
  padding: 8,
  marginBottom: 8,
  borderRadius: 8,
}

const ChatItem: React.FC<Props> = (props) => {
  const { account } = useContext(AccountContext)
  const { message } = props
  const fromMe = account.id === message.fromAccountId
  if (fromMe) {
    return (
      <View style={{ flexDirection: "row-reverse" }}>
        <View style={{ ...chatItemStyle, backgroundColor: Theme.colors.accent }}>
          <Text style={{ textAlign: "right" }}>{props.message.text}</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ ...chatItemStyle, backgroundColor: Theme.colors.notification }}>
          <Text style={{ textAlign: "left" }}>{props.message.text}</Text>
        </View>
      </View>
    )
  }
}

export default ChatItem
