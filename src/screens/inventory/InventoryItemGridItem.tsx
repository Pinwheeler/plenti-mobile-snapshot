import { Text, useTheme } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

import { InventoryItem } from "../../api/models/InventoryItem"
import { itemForName } from "../../assets/PlentiItemsIndex"
import { ProduceGridItem } from "../../components/produce_grid/ProduceGridItem"
import { StalenessIcon } from "../../components/produce_grid/StalenessIcon"
import { fromISOTime } from "../../lib/DateHelper"

interface Props {
  inventoryItem: InventoryItem
  onPress?: () => void
}

export const InventoryItemGridItem: React.FC<Props> = (props) => {
  const { inventoryItem, onPress } = props
  const { theme } = useTheme()

  const item = itemForName(inventoryItem.plentiItemName)

  if (!item) {
    return null
  }

  return (
    <ProduceGridItem onPress={onPress} plentiItem={item} imageURL={inventoryItem.imageUrl}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: theme.colors.grey2 }}>{inventoryItem.quantity}</Text>
        <Text style={{ marginLeft: "auto" }}>
          <StalenessIcon date={fromISOTime(inventoryItem.updatedAt)} />
        </Text>
      </View>
    </ProduceGridItem>
  )
}
