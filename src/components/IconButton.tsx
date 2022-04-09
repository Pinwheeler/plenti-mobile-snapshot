import React from "react"
import { Pressable, ViewStyle } from "react-native"
import { Icon, IconType } from "./Icon"

interface Props {
  size?: number
  type: IconType
  onPress(): void
  color?: string
  style?: ViewStyle
}

export const IconButton: React.FC<Props> = (props) => {
  const { onPress, style, ...otherProps } = props
  return (
    <Pressable
      style={({ pressed }) => {
        return {
          width: 46,
          height: 46,
          borderRadius: 50,
          ...style,
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          opacity: pressed ? 0.5 : 1.0,
        }
      }}
      onPressOut={onPress}
    >
      <Icon {...otherProps} />
    </Pressable>
  )
}
