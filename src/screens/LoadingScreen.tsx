import { Text, useTheme } from "@rneui/themed"
import React from "react"
import { ActivityIndicator, View } from "react-native"

interface Props {
  loading: boolean
  loadingMessage: string
}

export const LoadingScreen: React.FC<Props> = (props) => {
  const { theme } = useTheme()
  return (
    <>
      {props.children}
      {props.loading && (
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: theme.colors.background,
          }}
        >
          <Text h2>{props.loadingMessage}</Text>
          <View style={{ height: 20 }} />
          <ActivityIndicator />
        </View>
      )}
    </>
  )
}
