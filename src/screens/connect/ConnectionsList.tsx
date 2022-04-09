import { useTheme } from "@rneui/themed"
import React, { useContext, useState } from "react"
import { Text, RefreshControl, View } from "react-native"
import { ScrollView } from "react-native"
import { ChatContext } from "../../contexts/ChatContext"
import { ConnectionListItem } from "./ConnectionListItem"

const ConnectionsList: React.FC = () => {
  const { myConnections } = useContext(ChatContext)
  const { theme } = useTheme()
  const [refreshing, setRefreshing] = useState(false)

  if (myConnections.size > 0) {
    return (
      <>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 15,
              paddingTop: 15,
              paddingBottom: 5,
              backgroundColor: theme.colors.success,
            }}
          >
            <Text style={{ textAlign: "left", flex: 6, fontWeight: "bold" }}>Partner</Text>
            <Text style={{ textAlign: "right", flex: 2, fontWeight: "bold" }}>Inventory</Text>
          </View>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
          {Array.from(myConnections.values()).map((connection) => (
            <ConnectionListItem connection={connection} key={`connection-item-${connection.conversationUid}`} />
          ))}
        </ScrollView>
      </>
    )
  } else {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
        <Text style={{ textAlign: "center", color: theme.colors.disabled }}>No Connections Found.</Text>
        <Text style={{ textAlign: "center", color: theme.colors.disabled }}>
          Make connections on the Request screen.
        </Text>
        <Text style={{ textAlign: "center", color: theme.colors.disabled }} />
      </ScrollView>
    )
  }
}

export default ConnectionsList
