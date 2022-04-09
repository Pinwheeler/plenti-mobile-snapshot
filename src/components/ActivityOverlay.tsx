import { Text } from "@rneui/themed"
import React from "react"
import { ActivityIndicator, View } from "react-native"

interface Props {
  loadingMessage?: string
}

const ActivityOverlay: React.FC<Props> = (props) => {
  const { loadingMessage } = props
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" />
      {loadingMessage && <Text h1>{loadingMessage}</Text>}
    </View>
  )
}

export default ActivityOverlay
