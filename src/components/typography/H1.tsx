import React from "react"
import { Text, TextStyle, StyleProp, View } from "react-native"

interface Props {
  style?: StyleProp<TextStyle>
}

export const H1: React.FC<Props> = (props) => {
  return (
    <View style={props.style}>
      <Text style={{ fontSize: 48 }}>{props.children}</Text>
    </View>
  )
}
