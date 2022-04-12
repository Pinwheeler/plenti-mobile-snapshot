import React from "react"
import { ViewStyle, TouchableOpacity } from "react-native"
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
    <TouchableOpacity
      style={{
        width: 46,
        height: 46,
        borderRadius: 50,
        ...style,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
      onPress={onPress}
    >
      <Icon {...otherProps} />
    </TouchableOpacity>
  )
}
