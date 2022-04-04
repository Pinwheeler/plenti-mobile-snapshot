import React from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import { DistancedInventoryItem } from "../../api/views/DistancedInventoryItem.view"
import { Icon } from "../../components/Icon"
import { IconButton } from "../../components/IconButton"
import { ProduceItemImage } from "../../components/ProduceItemImage"
import { fromISOTime, timeDifference } from "../../lib/DateHelper"
import Theme from "../../lib/Theme"

interface Props {
  selectedItem: DistancedInventoryItem
  distanceString: string
  onCancel(): void
  onConnect(): void
}

export const ConfirmNearbyRequest: React.FC<Props> = (props) => {
  const { selectedItem, distanceString, onCancel, onConnect } = props
  if (!selectedItem) {
    return null
  }

  const quantityLine = selectedItem.inventoryItem.quantity
  const distanceLine = `${distanceString} away`
  const stalenessLine = timeDifference(new Date(), fromISOTime(selectedItem.inventoryItem.updatedAt))
  return (
    <View style={{ backgroundColor: Theme.colors.surface, margin: 30, borderRadius: 5 }}>
      <ProduceItemImage
        imageOverride={selectedItem.inventoryItem.imageUrl}
        style={{ width: "100%", height: 300, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
        item={selectedItem.inventoryItem.plentiItemName}
      />
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View style={{ flexDirection: "column", width: "50%" }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{selectedItem.inventoryItem.plentiItemName}</Text>
            <Text style={{ color: Theme.colors.secondaryText }}>{distanceLine}</Text>
            <Text style={{ color: Theme.colors.secondaryText }}>{quantityLine}</Text>
          </View>
          <View style={{ flexDirection: "column", width: "50%", alignItems: "flex-end" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ maxWidth: 240, color: Theme.colors.secondaryText, fontSize: 14, marginRight: 5 }}>
                {selectedItem.owningAccountUsername}
              </Text>
              <Icon color={Theme.colors.secondaryText} size={16} type={"user-alt"} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: Theme.colors.secondaryText, fontSize: 14, marginRight: 5 }}>{stalenessLine}</Text>
              <Icon color={Theme.colors.secondaryText} size={16} type={"clock"} />
            </View>
          </View>
        </View>
        <Button mode="contained" onPress={onConnect}>
          Connect
        </Button>
      </View>
      <IconButton
        onPress={onCancel}
        color={Theme.colors.surface}
        style={{ position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)", right: 0 }}
        type={"times"}
      />
    </View>
  )
}
