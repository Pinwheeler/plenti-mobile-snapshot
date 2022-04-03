import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { useContext } from "react"
import { View } from "react-native"
import { PremiumContext } from "../../contexts/PremiumContext"
import Theme from "../../lib/Theme"
import { NearMeSelector } from "./NearMeSelector"
import WantSelector from "./WantSelector"

const Tab = createMaterialTopTabNavigator()

export const HomeScreen: React.FC = () => {
  const Nearby = () => <NearMeSelector />
  const { hasPremium } = useContext(PremiumContext)

  const Wants = () => (
    <View
      style={{
        backgroundColor: Theme.colors.background,
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
      <Tab.Navigator>
        <Tab.Screen options={{ swipeEnabled: false }} name="Nearby" component={Nearby} />
        <Tab.Screen options={{ swipeEnabled: false }} name="Search" component={Wants} />
      </Tab.Navigator>
    )
  } else {
    return <Nearby />
  }
}
