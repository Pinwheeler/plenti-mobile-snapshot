import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Theme from "../../lib/Theme"
import ConnectionsList from "./ConnectionsList"

const Tab = createMaterialTopTabNavigator()

const ConnectScreen = () => {
  return <ConnectionsList />
}

export default ConnectScreen
