import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";

export type IconType =
  | "camera_solid"
  | "check_circle_solid"
  | "clock_regular"
  | "envelope_solid"
  | "seedling_solid"
  | "store_solid"
  | "user_solid"
  | "cog"
  | "flag"
  | "gps"
  | "play"
  | "close"
  | "plus"
  | "search"
  | "chevron_up"
  | "chevron_down"
  | "pencil";

interface Props {
  type: IconType;
  size?: number;
  style?: ViewStyle;
  color?: string;
}

export const Icon: React.FC<Props> = (props) => (
  <View>
    <FontAwesome5 name={props.type} size={props.size} color={props.color} />
  </View>
);
