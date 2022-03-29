import React, { useContext } from "react"
import { View } from "react-native"
import { Paragraph } from "react-native-paper"
import { InventoryItemEntity } from "../../api/models/InventoryItem"
import { ProduceGridItem } from "../../components/produce_grid/ProduceGridItem"
import { StalenessIcon } from "../../components/produce_grid/StalenessIcon"
import { PlentiItemContext } from "../../contexts/PlentiItemContext"
import Theme from "../../lib/Theme"

interface Props {
  inventoryItem: InventoryItemEntity
}

export const InventoryItemGridItem: React.FC<Props> = (props) => {
  const { inventoryItem } = props
  const {itemForId} = useContext(PlentiItemContext)

  const item = itemForId(inventoryItem.plentiItemId)

  if (!item) {
    return null
  }

  return (
    <ProduceGridItem plentiItem={item}>
      <View style={{ flexDirection: "row" }}>
        <Paragraph style={{ color: Theme.colors.secondaryText }}>{inventoryItem.currentQuantity}</Paragraph>
        <Paragraph style={{ marginLeft: "auto" }}>
          <StalenessIcon date={inventoryItem.updatedAt} />
        </Paragraph>
      </View>
    </ProduceGridItem>
  )
}
