import { Button, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

import { Icon } from "../../components/Icon"
import Theme from "../../lib/Theme"
import { HardwareNotification } from "./HardwareNotification"

interface Props {
  notification: HardwareNotification
  onAcknowledge(): void
}

export const HardwareNotificationContent: React.FC<Props> = (props) => {
  const { notification } = props
  return (
    <View style={{ position: "relative", justifyContent: "center", paddingTop: 10 }}>
      <Text h1>{notification.title}</Text>
      {notification.iconName && (
        <View
          style={{
            width: 95,
            height: 95,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: -74,
            left: "36%",
            backgroundColor: Theme.colors.background,
          }}
        >
          <View
            style={{
              backgroundColor: Theme.colors.notification,
              width: 80,
              height: 80,
              borderColor: Theme.colors.background,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon color={Theme.colors.primary} size={42} type={notification.iconName} />
          </View>
        </View>
      )}
      <Text>{notification.description}</Text>
      {!notification.blocking && (
        <Button style={{ marginTop: 20 }} onPress={props.onAcknowledge}>
          Okay!
        </Button>
      )}
    </View>
  )
}
