import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useContext, useMemo } from "react";
import { Modal, Portal } from "react-native-paper";
import { HardwareNotificationEntity } from "../api/models";
import { AdBanner } from "../components/AdBanner";
import { Icon } from "../components/Icon";
import { AdContext } from "../contexts/AdContext";
import { HardwareNotificationContent } from "../contexts/HardwareNotificationContent";
import { NotificationContext } from "../contexts/NotificationContext";
import Theme from "../lib/Theme";
import { ConnectScreen } from "../screens/ConnectScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { InventoryScreen } from "../screens/InventoryScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

export const TabNav = () => {
  const { shouldShowAds } = useContext(AdContext);
  const { acknowledgeHN, nextUnreadHN } = useContext(NotificationContext);

  const nextActionableHN: HardwareNotificationEntity | undefined =
    useMemo(() => {
      if (!nextUnreadHN) {
        return undefined;
      }
      if (!nextUnreadHN.blocking) {
        nextUnreadHN.appendCommands(() => acknowledgeHN(nextUnreadHN));
      }
      return nextUnreadHN;
    }, [nextUnreadHN]);

  const hasUnreads = false;

  return (
    <>
      <Tab.Navigator barStyle={{ backgroundColor: Theme.colors.primary }}>
        <Tab.Screen
          name="Request"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon type="seedling" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Connect"
          component={ConnectScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon type="envelope" size={24} color={color} />
            ),
            tabBarBadge: hasUnreads,
          }}
        />
        <Tab.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon type="store" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon type="user-alt" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      {shouldShowAds && <AdBanner />}
      <Portal>
        <Modal
          visible={!!nextActionableHN}
          dismissable={false}
          contentContainerStyle={{
            backgroundColor: Theme.colors.surface,
            padding: 15,
            margin: 15,
          }}
        >
          {nextActionableHN && (
            <HardwareNotificationContent notification={nextActionableHN} />
          )}
        </Modal>
      </Portal>
    </>
  );
};
