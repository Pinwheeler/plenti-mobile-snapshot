import React from "react"
import { View } from "react-native"
import { Paragraph } from "react-native-paper"
import { InventoryItem } from "../../api/models/InventoryItem"
import { itemForName } from "../../assets/PlentiItemsIndex"
import { ProduceGridItem } from "../../components/produce_grid/ProduceGridItem"
import { StalenessIcon } from "../../components/produce_grid/StalenessIcon"
import Theme from "../../lib/Theme"

interface Props {
  inventoryItem: InventoryItem
  onPress?: () => void
}

export const InventoryItemGridItem: React.FC<Props> = (props) => {
  const { inventoryItem, onPress } = props

  const item = itemForName(inventoryItem.plentiItemName)

  if (!item) {
    return null
  }

  return (
    <ProduceGridItem onPress={onPress} plentiItem={item} imageURL={inventoryItem.imageUrl}>
      <View style={{ flexDirection: "row" }}>
        <Paragraph style={{ color: Theme.colors.secondaryText }}>{inventoryItem.quantity}</Paragraph>
        <Paragraph style={{ marginLeft: "auto" }}>
          <StalenessIcon date={inventoryItem.updatedAt} />
        </Paragraph>
      </View>
    </ProduceGridItem>
  )
}
