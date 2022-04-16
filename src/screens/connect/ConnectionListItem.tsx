import database from "@react-native-firebase/database"
import { useNavigation } from "@react-navigation/native"
import { Text, useTheme } from "@rneui/themed"
import React, { useContext, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { ActivityIndicator } from "react-native-paper"
import { AccountEntity } from "../../api/models/Account"
import { Connection } from "../../api/models/Connection"
import { ChatContext } from "../../contexts/ChatContext"
import { HomeNavProp } from "../../nav/HomeStack"

interface Props {
  connection: Connection
}

export const ConnectionListItem: React.FC<Props> = (props) => {
  const { connection } = props
  const navigation = useNavigation<HomeNavProp>()
  const { deleteConnection } = useContext(ChatContext)
  const [partnerAccount, setPartnerAccount] = useState<AccountEntity>()
  const unread = connection.unreadMessageCount > 0
  const { theme } = useTheme()
  // TODO: show images of all of the user's inventory items

  useEffect(() => {
    const path = `/accounts/${connection.partnerUid}`
    const partnerChange = database()
      .ref(path)
      .on("value", (snapshot) => setPartnerAccount(new AccountEntity(snapshot.val())))
    return () => database().ref(path).off("value", partnerChange)
  }, [connection])

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
