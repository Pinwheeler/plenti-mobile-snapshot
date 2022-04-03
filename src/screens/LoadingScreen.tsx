import React from "react"
import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { H2 } from "../components/typography"
import Theme from "../lib/Theme"

interface Props {
  loading: boolean
  loadingMessage: string
}

export const LoadingScreen: React.FC<Props> = (props) => {
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
            backgroundColor: Theme.colors.background,
          }}
        >
          <H2>{props.loadingMessage}</H2>
          <View style={{ height: 20 }} />
          <ActivityIndicator />
        </View>
      )}
    </>
  )
}
