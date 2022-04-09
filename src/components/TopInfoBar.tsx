import { Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

interface Props {
  text: string
}

export const TopInfoBar: React.FC<Props> = (props) => {
  return (
    <View style={{ paddingHorizontal: 30, paddingVertical: 5, elevation: 2 }}>
      <Text h3>{props.text}</Text>
    </View>
  )
}
