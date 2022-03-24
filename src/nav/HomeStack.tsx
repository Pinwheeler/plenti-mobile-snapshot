import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { PremiumContext } from "../contexts/PremiumContext";
import Theme from "../lib/Theme";
import { HomeScreen } from "../screens/HomeScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  const { hasPremium } = useContext(PremiumContext);
  const headerTitle = hasPremium ? "★ Plenti-Full" : "Plenti";
  // unclear why the type system doesn't recognize this function

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.primary },
        headerTintColor: Theme.colors.background,
        cardStyle: { backgroundColor: Theme.colors.background },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/*    <Stack.Screen
  //       name="Plenti"
  //       component={TabNav}
  //       options={{ headerTitleAlign: "left", headerTitle: headerTitle }}
  //     />
  //     {/* <Stack.Screen
  //       name="Chat"
  //       component={ChatScreen}
  //       options={{ title: "Chat", headerRight: () => <ConnectionStatus /> }}
  //     />
  //     <Stack.Screen
  //       name="AddInventoryItem"
  //       component={AddInventoryItemScreen}
  //       options={{ title: "Add to Inventory" }}
  //     />
  //     <Stack.Screen
  //       name="UpdateProfile"
  //       component={UpdateProfileScreen}
  //       options={({ navigation }) => ({
  //         title: "Update Profile",
  //       })}
  //     /> */}
      {/* <Stack.Screen
  //       name="CatalogRequest"
  //       component={CatalogRequestScreen}
  //       options={{ title: "Catalog Request" }}
  //     />
  //     <Stack.Screen
  //       name="ForgotPassword"
  //       component={ForgotPasswordForm}
  //       options={{ title: "Forgot Password" }}
  //     />
  //     <Stack.Screen
  //       name="Store"
  //       component={PremiumScreen}
  //       options={{ title: "Plenti-Full" }}
  //     /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
