import { Text, useTheme } from "@rneui/themed"
import React from "react"
import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"

interface Props {
  thingThatIsLoading: string
}

export const LoadingIndicator: React.FC<Props> = (props) => {
  const { theme } = useTheme()
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator style={{ marginRight: 15 }} color={theme.colors.secondary} />
      <Text>{`Loading ${props.thingThatIsLoading}...`}</Text>
    </View>
  )
}
