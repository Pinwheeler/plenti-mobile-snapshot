import { HardwareNotificationEntity } from "plenti-api";
import React from "react";
import { Text } from "react-native-paper";

interface Props {
  notification: HardwareNotificationEntity;
}

export const HardwareNotificationContent: React.FC<Props> = (props) => {
  return <Text>Hardware Notification Content</Text>;
};
