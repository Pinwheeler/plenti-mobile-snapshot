import { useTheme } from "@rneui/themed"
import React from "react"
import { View } from "react-native"
import { TopInfoBar } from "../../components/TopInfoBar"
import { InventoryList } from "./InventoryList"

export const InventoryScreen: React.FC = () => {
  const { theme } = useTheme()
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <TopInfoBar text="Your Listed Produce" />
      <InventoryList />
    </View>
  )
}
