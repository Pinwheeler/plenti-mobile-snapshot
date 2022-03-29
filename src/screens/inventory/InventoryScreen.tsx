import React from "react";
import { View } from "react-native";
import { TopInfoBar } from "../../components/TopInfoBar";
import Theme from "../../lib/Theme";
import { InventoryList } from "./InventoryList";

export const InventoryScreen: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: Theme.colors.background,
        flex: 1,
      }}
    >
      <TopInfoBar text="Your Listed Produce" />
      <InventoryList />
    </View>
  );
};
