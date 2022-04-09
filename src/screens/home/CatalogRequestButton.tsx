import { CommonActions, useNavigation } from "@react-navigation/native"
import { Button, Text } from "@rneui/themed"
import React from "react"
import { View, ViewProps } from "react-native"

import Theme from "../../lib/Theme"

export const CatalogRequestButton: React.FC<ViewProps> = (props) => {
  const navigation = useNavigation()

  return (
    <View
      {...props}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.colors.notification,
      }}
    >
      <View
        style={{
          padding: 15,
          marginHorizontal: 30,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Don't see what you're looking for?
        </Text>
        <Button onPress={() => navigation.dispatch(CommonActions.navigate({ name: "CatalogRequest" }))}>
          Click Here
        </Button>
      </View>
    </View>
  )
}
