import React, { useContext } from "react"
import { View } from "react-native"
import { Paragraph } from "react-native-paper"
import { InventoryItem } from "../../api/models/InventoryItem"
import { ProduceGridItem } from "../../components/produce_grid/ProduceGridItem"
import { StalenessIcon } from "../../components/produce_grid/StalenessIcon"
import { PlentiItemContext } from "../../contexts/PlentiItemContext"
import Theme from "../../lib/Theme"

interface Props {
  inventoryItem: InventoryItem
}

export const InventoryItemGridItem: React.FC<Props> = (props) => {
  const { inventoryItem } = props
  const { itemForName } = useContext(PlentiItemContext)

  const item = itemForName(inventoryItem.plentiItemName)

  if (!item) {
    return null
  }

  return (
    <ProduceGridItem plentiItem={item}>
      <View style={{ flexDirection: "row" }}>
        <Paragraph style={{ color: Theme.colors.secondaryText }}>{inventoryItem.quantity}</Paragraph>
        <Paragraph style={{ marginLeft: "auto" }}>
          <StalenessIcon date={inventoryItem.updatedAt} />
        </Paragraph>
      </View>
    </ProduceGridItem>
  )
}
