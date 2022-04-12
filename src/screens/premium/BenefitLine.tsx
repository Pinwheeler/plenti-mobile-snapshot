import React from "react"
import { Image, StyleProp, View, ViewStyle } from "react-native"
import { Paragraph } from "react-native-paper"

interface Props {
  text: string
  image: any
  style?: StyleProp<ViewStyle>
}

const BenefitLine: React.FC<Props> = (props) => {
  const style: StyleProp<ViewStyle> = props.style ?? ({} as StyleProp<ViewStyle>)
  return (
    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Image source={props.image} style={{ flex: 5, height: 60 }} resizeMode={"contain"} />
      <View style={{ flex: 1 }} />
      <Paragraph style={{ flex: 24, fontSize: 12, textAlign: "center", lineHeight: 15 }}>{props.text}</Paragraph>
    </View>
  )
}

export default BenefitLine
