import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useTheme } from "@rneui/themed"
import React, { useContext } from "react"
import { View } from "react-native"
import { PremiumContext } from "../../contexts/PremiumContext"
import { InventoryList } from "./InventoryList"
import { WatchersList } from "./WatchersList"

const Tab = createMaterialTopTabNavigator()

export const InventoryScreen: React.FC = () => {
  const { theme } = useTheme()
  const { hasPremium } = useContext(PremiumContext)
  const Inventory = () => <InventoryList />

  const Watchers = () => (
    <View>
      <WatchersList />
    </View>
  )

  if (hasPremium) {
    return (
      <Tab.Navigator
        screenOptions={{ swipeEnabled: false, tabBarIndicatorStyle: { backgroundColor: theme.colors.success } }}
      >
        <Tab.Screen name="produce-inventory" options={{ title: "Inventory" }} component={Inventory} />
        <Tab.Screen name="Watchers" component={Watchers} />
      </Tab.Navigator>
    )
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <InventoryList />
    </View>
  )
}
