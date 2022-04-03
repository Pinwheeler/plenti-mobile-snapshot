import { FontAwesome5 } from "@expo/vector-icons"
import React from "react"
import { View, ViewStyle } from "react-native"

export type IconType =
  | "user-alt"
  | "store"
  | "envelope"
  | "seedling"
  | "camera"
  | "check-circle"
  | "clock"
  | "envelope"
  | "cog"
  | "flag"
  | "gps"
  | "play"
  | "times"
  | "times-circle"
  | "plus"
  | "search"
  | "chevron-up"
  | "chevron-down"
  | "pencil"
  | "map-marked-alt"

interface Props {
  type: IconType
  size?: number
  style?: ViewStyle
  color?: string
}

export const Icon: React.FC<Props> = (props) => (
  <View>
    <FontAwesome5 name={props.type} size={props.size} color={props.color} />
  </View>
)
