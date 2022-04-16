import { Text } from "@rneui/themed"
import React from "react"
import { ActivityIndicator, View } from "react-native"

interface Props {
  thingThatIsLoading: string
}

export const LoadingIndicator: React.FC<Props> = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <ActivityIndicator />
      <Text h4>{`Loading ${props.thingThatIsLoading}`}</Text>
    </View>
  )
}
