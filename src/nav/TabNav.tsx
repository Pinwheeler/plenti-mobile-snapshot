import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HardwareNotificationEntity } from "plenti-api";
import React, { useContext, useMemo } from "react";
import { View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import ProfileScreen from "src/account/profile/ProfileScreen";
import AdContext from "src/ads/AdContext";
import ConnectScreen from "src/connect/ConnectScreen";
import HomeScreen from "src/home/HomeScreen";
import InventoryScreen from "src/inventory/InventoryScreen";
import Theme from "src/lib/Theme";
import NotificationContext from "src/notifications/NotificationContext";
import { Icon, IconType } from "src/shared/icons/Icon";
import AdBanner from "../ads/AdBanner";
import { HardwareNotificationContent } from "./HardwareNotificationContent";

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
              <View>
                <Icon color={color} size={24} type={IconType.seedling_solid} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Connect"
          component={ConnectScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View>
                <Icon color={color} size={24} type={IconType.envelope_solid} />
              </View>
            ),
            tabBarBadge: hasUnreads,
          }}
        />
        <Tab.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View>
                <Icon color={color} size={24} type={IconType.store_solid} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View>
                <Icon color={color} size={24} type={IconType.user_solid} />
              </View>
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
