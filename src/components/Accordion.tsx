import { Text } from "@rneui/themed"
import React, { useState } from "react"
import { LayoutAnimation, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { capitalize } from "../lib/StringHelpers"
import { Icon } from "./Icon"

interface Props {
  title: string
}

export const Accordion: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState(false)
  const titleText = capitalize(props.title)

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(!expanded)
  }

  return (
    <>
      <TouchableOpacity
        onPress={toggleExpand}
        style={{ paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text h4>{titleText}</Text>
        <Icon type="chevron-down" />
      </TouchableOpacity>
      {expanded && <View>{props.children}</View>}
    </>
  )
}
