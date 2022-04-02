import React from "react"
import { Text } from "react-native-paper"
import { HardwareNotification } from "../api/models/HardwareNotification"

interface Props {
  notification: HardwareNotification
}

export const HardwareNotificationContent: React.FC<Props> = (props) => {
  return <Text>Hardware Notification Content</Text>
}
