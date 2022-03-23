import React from "react"
import { Text, TextStyle, StyleProp, View } from "react-native"

interface Props {
  style?: StyleProp<TextStyle>
}

export const H3: React.FC<Props> = (props) => {
  return (
    <View style={props.style}>
      <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
    </View>
  )
}
