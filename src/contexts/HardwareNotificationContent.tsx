import React from "react";
import { Text } from "react-native-paper";
import { HardwareNotificationEntity } from "../api/models/HardwareNotification";

interface Props {
  notification: HardwareNotificationEntity;
}

export const HardwareNotificationContent: React.FC<Props> = (props) => {
  return <Text>Hardware Notification Content</Text>;
};
