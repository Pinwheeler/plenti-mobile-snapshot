import { NavigationContext, useNavigation } from "@react-navigation/native"
import React, { useContext, useRef, useState } from "react"
import { TouchableHighlight } from "react-native-gesture-handler"
import { Text } from "react-native-paper"
import { Connection } from "../../api/models/Connection"
import { AccountContext } from "../../contexts/AccountContext"
import { ChatContext } from "../../contexts/ChatContext"
import Theme from "../../lib/Theme"

interface Props {
  connection: Connection
}

export const ConnectionListItem: React.FC<Props> = (props) => {
  const { connection } = props
  const navigation = useNavigation()
  const { loggedInAccount } = useContext(AccountContext)
  const { deleteConnection } = useContext(ChatContext)
  const [isDeleting, setIsDeleting] = useState(false)
  const myId = loggedInAccount?.uid || -1
  const owned = connection?.partnerB.id === myId // should be false if no account
  const matchName = owned ? connection.partnerA.username : connection.partnerB.username
  const unread = false
  const ref = useRef<SwipeRow<ConnectionEntity>>(null)
  // TODO: show images of all of the user's inventory items

  const onDelete = () => {
    setIsDeleting(true)
    deleteConnection(connection).finally(() => {
      setIsDeleting(false)
    })
  }

  return (
    <>
      <TouchableHighlight
        style={{
          flexDirection: "row",
          padding: 15,
        }}
        underlayColor={Theme.colors.primary}
        onPress={() => {
          navigate("Chat", { connection })
        }}
      >
        <Text style={{ textAlign: "left", flex: 6 }}>
          <Text style={{ color: Theme.colors.notification }}>{unread ? "⬤\t" : ""}</Text>
          <Text style={{ textAlign: "left" }}>{matchName}</Text>
        </Text>
      </TouchableHighlight>
    </>
  )
}
