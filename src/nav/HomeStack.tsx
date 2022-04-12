import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { useTheme } from "@rneui/themed"
import React, { useContext } from "react"
import { AccountEntity } from "../api/models/Account"
import { Connection } from "../api/models/Connection"
import { PremiumContext } from "../contexts/PremiumContext"
import { AddInventoryItemScreen } from "../screens/add_inventory/AddInventoryItemScreen"
import { ChatScreen } from "../screens/chat/ChatScreen"
import { UpdateProfileScreen } from "../screens/update_profile/UpdateProfileScreen"
import { TabNav } from "./TabNav"

export type RootStackParams = {
  Plenti: undefined
  Chat: { connection: Connection; partnerAccount: AccountEntity }
  AddInventoryItem: undefined
  UpdateProfile: undefined
  CatalogRequest: undefined
  ForgotPassword: undefined
  Store: undefined
}

const Stack = createStackNavigator<RootStackParams>()

export type HomeNavProp = StackNavigationProp<RootStackParams>

const HomeStack = () => {
  const { hasPremium } = useContext(PremiumContext)
  const { theme } = useTheme()
  const headerTitle = hasPremium ? "★ Plenti-Full" : "Plenti"

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.background,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="Plenti" component={TabNav} options={{ headerTitleAlign: "left", headerTitle: headerTitle }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Chat" }} />
      <Stack.Screen
        name="AddInventoryItem"
        component={AddInventoryItemScreen}
        options={{ title: "Add to Inventory" }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={({ navigation }) => ({
          title: "Update Profile",
        })}
      />
      {/* <Stack.Screen
        name="CatalogRequest"
        component={CatalogRequestScreen}
        options={{ title: "Catalog Request" }}
      /> */}
      {/* <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordForm}
        options={{ title: "Forgot Password" }}
      /> */}
      {/* <Stack.Screen
        name="Store"
        component={PremiumScreen}
        options={{ title: "Plenti-Full" }}
      /> */}
    </Stack.Navigator>
  )
}

export default HomeStack
