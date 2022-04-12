import { CommonActions, useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"

import { AccountEntity } from "../../api/models/Account"
import { Connection } from "../../api/models/Connection"
import { AccountContext } from "../../contexts/AccountContext"
import { ChatContext } from "../../contexts/ChatContext"
import database from "@react-native-firebase/database"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { Text, useTheme } from "@rneui/themed"
import { TouchableOpacity } from "react-native-gesture-handler"
import { ActivityIndicator } from "react-native-paper"
import { HomeNavProp, RootStackParams } from "../../nav/HomeStack"

interface Props {
  connection: Connection
}

export const ConnectionListItem: React.FC<Props> = (props) => {
  const { connection } = props
  const navigation = useNavigation<HomeNavProp>()
  const { loggedInAccount } = useContext(AccountContext)
  const { deleteConnection } = useContext(ChatContext)
  const [isDeleting, setIsDeleting] = useState(false)
  const [partnerAccount, setPartnerAccount] = useState<AccountEntity>()
  const myId = loggedInAccount?.uid || -1
  const unread = false
  const { theme } = useTheme()
  // TODO: show images of all of the user's inventory items

  useEffect(() => {
    const path = `/accounts/${connection.partnerUid}`
    const partnerChange = database()
      .ref(path)
      .on("value", (snapshot) => setPartnerAccount(new AccountEntity(snapshot.val())))
    return () => database().ref(path).off("value", partnerChange)
  }, [connection])

  const onDelete = () => {
    setIsDeleting(true)
    deleteConnection(connection).finally(() => {
      setIsDeleting(false)
    })
  }

  if (!partnerAccount) {
    return <ActivityIndicator />
  }

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          padding: 15,
        }}
        // underlayColor={Theme.colors.primary}
        onPress={() => {
          navigation.navigate("Chat", { connection, partnerAccount })
        }}
      >
        <Text style={{ textAlign: "left", flex: 6 }}>
          <Text style={{ color: theme.colors.success }}>{unread ? "⬤\t" : ""}</Text>
          <Text style={{ textAlign: "left" }}>{partnerAccount.username}</Text>
        </Text>
      </TouchableOpacity>
    </>
  )
}
