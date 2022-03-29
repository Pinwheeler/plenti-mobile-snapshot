import React from "react"
import { RefreshControlProps, ScrollView, View } from "react-native"

interface Props {
  refreshControl?: React.ReactElement<
    RefreshControlProps,
    string | ((props: any) => React.ReactElement<any, any>) | (new (props: any) => React.Component<any, any, any>)
  >
}

export const ProduceGrid: React.FC<Props> = (props) => {
  return (
    <ScrollView refreshControl={props.refreshControl}>
      <View style={{ height: 10 }} />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        {props.children}
        <View style={{ height: 50, width: "100%" }} />
      </View>
    </ScrollView>
  )
}
