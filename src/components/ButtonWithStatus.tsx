import React from "react"
import { ViewStyle } from "react-native"
import { ActivityIndicator, Button, Text } from "react-native-paper"

interface Props {
  success?: boolean
  loading?: boolean
  onPress: () => void
  disabled?: boolean
  mode?: "text" | "outlined" | "contained" | undefined
  style?: ViewStyle
}

export const ButtonWithStatus: React.FC<Props> = (props) => {
  const { success, loading, children, ...rest } = props

  if (loading) {
    return <ActivityIndicator />
  }
  if (success) {
    return <Text>{"Success!"}</Text>
  }
  return <Button {...rest}>{children}</Button>
}
