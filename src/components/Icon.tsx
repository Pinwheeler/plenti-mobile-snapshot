import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { View, ViewStyle } from "react-native"

const FontAweseome5Types = [
  "user-alt",
  "store",
  "envelope",
  "seedling",
  "camera",
  "check-circle",
  "clock",
  "envelope",
  "cog",
  "flag",
  "play",
  "times",
  "times-circle",
  "plus",
  "search",
  "chevron-up",
  "chevron-down",
  "pencil",
  "map-marked-alt",
]

const MaterialIconTypes = ["gps-fixed", "gps-not-fixed"]

type FontAweseome5Type = typeof FontAweseome5Types[number]
type MaterialIconType = typeof MaterialIconTypes[number]

export type IconType = FontAweseome5Type | MaterialIconType

const isFontAweseome5Type = (type: string): type is FontAweseome5Type => FontAweseome5Types.includes(type)
const isMaterialIconType = (type: string): type is MaterialIconType => MaterialIconTypes.includes(type)

interface Props {
  type: IconType
  size?: number
  style?: ViewStyle
  color?: string
}

export const Icon: React.FC<Props> = (props) => {
  if (isFontAweseome5Type(props.type)) {
    return (
      <View>
        <FontAwesome5 name={props.type} size={props.size} color={props.color} />
      </View>
    )
  } else if (isMaterialIconType(props.type)) {
    return (
      <View>
        <MaterialIcons name={props.type} size={props.size} color={props.color} />
      </View>
    )
  } else {
    return (
      <View>
        <FontAwesome5 name="question" size={props.size} color={props.color} />
      </View>
    )
  }
}
