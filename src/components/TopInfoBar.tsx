import React from "react"
import { View } from "react-native"
import { H2 } from "./typography"

interface Props {
  text: string
}

export const TopInfoBar: React.FC<Props> = (props) => {
  return (
    <View style={{ paddingHorizontal: 30, paddingVertical: 5, elevation: 2 }}>
      <H2>{props.text}</H2>
    </View>
  )
}
