import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./HomeStack";

const Stack = createStackNavigator();

const RootNavigator = () => {
  // Injection point if we want to wrap the app in a drawer system or something
  // it's non trivial to combine the two, figured this would lead to an easier time
  return <HomeStack />;
};

export default RootNavigator;
