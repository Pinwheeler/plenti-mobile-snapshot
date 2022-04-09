import { Button, Text, useTheme } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

import { Icon } from "../../components/Icon"
import { HardwareNotification } from "./HardwareNotification"

interface Props {
  notification: HardwareNotification
  onAcknowledge(): void
}

export const HardwareNotificationContent: React.FC<Props> = (props) => {
  const { notification } = props
  const { theme } = useTheme()
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
            backgroundColor: theme.colors.background,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.success,
              width: 80,
              height: 80,
              borderColor: theme.colors.background,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon color={theme.colors.primary} size={42} type={notification.iconName} />
          </View>
        </View>
      )}
      <Text>{notification.description}</Text>
      {!notification.blocking && <Button style={{ marginTop: 20 }} onPress={props.onAcknowledge} title="Okay!" />}
    </View>
  )
}
