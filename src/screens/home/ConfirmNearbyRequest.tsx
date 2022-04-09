import { Button, Text, useTheme } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

import { DistancedInventoryItem } from "../../api/views/DistancedInventoryItem.view"
import { Icon } from "../../components/Icon"
import { IconButton } from "../../components/IconButton"
import { ProduceItemImage } from "../../components/ProduceItemImage"
import { fromISOTime, timeDifference } from "../../lib/DateHelper"
import { capitalize } from "../../lib/StringHelpers"

interface Props {
  selectedItem: DistancedInventoryItem
  distanceString: string
  onCancel(): void
  onConnect(): void
}

export const ConfirmNearbyRequest: React.FC<Props> = (props) => {
  const { selectedItem, distanceString, onCancel, onConnect } = props
  const { theme } = useTheme()
  if (!selectedItem) {
    return null
  }

  const quantityLine = selectedItem.inventoryItem.quantity
  const distanceLine = `${distanceString} away`
  const stalenessLine = timeDifference(new Date(), fromISOTime(selectedItem.inventoryItem.updatedAt))
  return (
    <View style={{ backgroundColor: theme.colors.background, borderRadius: 5 }}>
      <ProduceItemImage
        imageOverride={selectedItem.inventoryItem.imageUrl}
        style={{ width: "100%", height: 300, borderRadius: 5 }}
        item={selectedItem.inventoryItem.plentiItemName}
      />
      <View>
        <View style={{ flexDirection: "row", marginVertical: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {capitalize(selectedItem.inventoryItem.plentiItemName)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View style={{ flexDirection: "column", width: "50%" }}>
            <Text style={{ color: theme.colors.grey2 }}>{distanceLine}</Text>
            <Text style={{ color: theme.colors.grey2 }}>{quantityLine}</Text>
          </View>
          <View style={{ flexDirection: "column", width: "50%", alignItems: "flex-end" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ maxWidth: 240, color: theme.colors.grey2, fontSize: 14, marginRight: 5 }}>
                {selectedItem.owningAccountUsername}
              </Text>
              <Icon color={theme.colors.grey2} size={16} type={"user-alt"} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: theme.colors.grey2, fontSize: 14, marginRight: 5 }}>{stalenessLine}</Text>
              <Icon color={theme.colors.grey2} size={16} type={"clock"} />
            </View>
          </View>
        </View>
        <Button onPress={onConnect} title={"Connect"} />
      </View>
      <IconButton
        onPress={onCancel}
        color={theme.colors.background}
        style={{ position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)", right: 0 }}
        type={"times"}
        size={24}
      />
    </View>
  )
}
