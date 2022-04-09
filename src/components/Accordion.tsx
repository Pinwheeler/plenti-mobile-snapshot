import React, { useState } from "react"
import { LayoutAnimation, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { capitalize } from "../lib/StringHelpers"

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
      <TouchableOpacity onPress={toggleExpand}>{titleText}</TouchableOpacity>
      {expanded && <View>{props.children}</View>}
    </>
  )
}
