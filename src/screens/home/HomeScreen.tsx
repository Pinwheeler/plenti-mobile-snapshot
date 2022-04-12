import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useTheme } from "@rneui/themed"
import React, { useContext } from "react"
import { View } from "react-native"
import { PremiumContext } from "../../contexts/PremiumContext"
import { NearMeSelector } from "./NearMeSelector"
import WantSelector from "./WantSelector"

const Tab = createMaterialTopTabNavigator()

export const HomeScreen: React.FC = () => {
  const Nearby = () => <NearMeSelector />
  const { hasPremium } = useContext(PremiumContext)
  const { theme } = useTheme()

  const Wants = () => (
    <View
      style={{
        backgroundColor: theme.colors.background,
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <WantSelector />
    </View>
  )

  if (hasPremium) {
    return (
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
          tabBarIndicatorStyle: { backgroundColor: theme.colors.success },
        }}
      >
        <Tab.Screen name="Nearby" component={Nearby} />
        <Tab.Screen name="Search" component={Wants} />
      </Tab.Navigator>
    )
  } else {
    return <Nearby />
  }
}
