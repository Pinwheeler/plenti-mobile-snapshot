import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React, { useContext } from "react"
import { View } from "react-native"
import { PremiumContext } from "../../contexts/PremiumContext"
import Theme from "../../lib/Theme"
import { NearMeSelector } from "./NearMeSelector"
import WantSelector from "./WantSelector"
import { WantSelectorProvider } from "./WantSelectorContext"

const Tab = createMaterialTopTabNavigator()

const HomeScreen: React.FC = () => {
  const Nearby = () => <NearMeSelector />
  const { hasPremium } = useContext(PremiumContext)

  const Wants = () => (
    <WantSelectorProvider>
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
    </WantSelectorProvider>
  )

  if (hasPremium) {
    return (
      <Tab.Navigator tabBarOptions={{ indicatorStyle: { backgroundColor: Theme.colors.accent } }} swipeEnabled={false}>
        <Tab.Screen name="Nearby" component={Nearby} />
        <Tab.Screen name="Search" component={Wants} />
      </Tab.Navigator>
    )
  } else {
    return <Nearby />
  }
}

export default HomeScreen
