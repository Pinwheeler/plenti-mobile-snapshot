import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { useTheme, Overlay } from "@rneui/themed"
import React, { useContext, useEffect, useState } from "react"

import { HardwareNotification } from "../api/models/HardwareNotification"
import { HardwareNotificationContent } from "../api/models/HardwareNotificationContent"
import { AdBanner } from "../components/AdBanner"
import { Icon } from "../components/Icon"
import { AdContext } from "../contexts/AdContext"
import { NotificationContext } from "../contexts/NotificationContext"
import { Logger } from "../lib/Logger"
import ConnectScreen from "../screens/connect/ConnectScreen"
import { HomeScreen } from "../screens/home/HomeScreen"
import { InventoryScreen } from "../screens/inventory/InventoryScreen"
import { ProfileScreen } from "../screens/profile/ProfileScreen"

const Tab = createMaterialBottomTabNavigator()

export const TabNav = () => {
  const { shouldShowAds } = useContext(AdContext)
  const { acknowledgeHN, nextUnreadHN } = useContext(NotificationContext)
  const { theme } = useTheme()
  const [currentHN, setCurrentHN] = useState<HardwareNotification>()

  useEffect(() => {
    setCurrentHN(nextUnreadHN)
  }, [nextUnreadHN])

  const handleAckPressed = () => {
    if (currentHN) {
      acknowledgeHN(currentHN)
    } else {
      Logger.error("Attempted to acknowledge undefined Hardware Notification")
    }
  }

  const hasUnreads = false

  return (
    <>
      <Tab.Navigator barStyle={{ backgroundColor: theme.colors.primary }}>
        <Tab.Screen
          name="Request"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon type="seedling" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Connect"
          component={ConnectScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon type="envelope" size={24} color={color} />,
            tabBarBadge: hasUnreads,
          }}
        />
        <Tab.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon type="store" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon type="user-alt" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
      {shouldShowAds && <AdBanner />}
      <Overlay
        isVisible={!!currentHN}
        style={{
          backgroundColor: theme.colors.background,
          padding: 15,
          margin: 15,
        }}
      >
        {currentHN && <HardwareNotificationContent onAcknowledge={handleAckPressed} notification={currentHN} />}
      </Overlay>
    </>
  )
}
