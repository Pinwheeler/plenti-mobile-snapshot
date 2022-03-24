import { HardwareNotificationEntity } from "plenti-api";
import React from "react";

interface INotificationContext {
  acknowledgeHN(arg: HardwareNotificationEntity): void;
  nextUnreadHN?: HardwareNotificationEntity;
}

export const NotificationContext = React.createContext(
  {} as INotificationContext
);

export const NotificationProvider: React.FC = (props) => {
  const acknowledgeHN = (arg: HardwareNotificationEntity) => {
    console.log(arg);
  };

  const nextUnreadHN = undefined;

  const value = { acknowledgeHN, nextUnreadHN };

  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  );
};
