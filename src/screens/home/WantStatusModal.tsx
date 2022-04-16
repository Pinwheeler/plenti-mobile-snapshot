import { Button, Text } from "@rneui/themed"
import React, { useContext, useState } from "react"
import { View } from "react-native"
import { Quantity } from "../../api/models/Quantity"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import { QuantitySelector } from "../../components/produce_grid/QuantitySelector"
import { InventoryContext } from "../../contexts/InventoryContext"

interface Props {
  item: PlentiItem
  onClose(): void
}

export const WantStatusModal: React.FC<Props> = (props) => {
  const { item, onClose } = props
  const { addWatcher, removeWatcher, myWatchers } = useContext(InventoryContext)
  const currentWatcher = Array.from(myWatchers.values()).find((entry) => entry.plentiItemName === item.name)
  const [quantity, setQuantity] = useState<Quantity | undefined>(currentWatcher?.quantity)
  const [loading, setLoading] = useState(false)

  const handleButtonPress = () => {
    if (quantity) {
      setLoading(true)
      if (!currentWatcher) {
        addWatcher(item, quantity)
          .then(() => onClose())
          .finally(() => {
            setLoading(false)
          })
      } else {
        removeWatcher(item)
          .then(() => onClose)
          .finally(() => setLoading(false))
      }
    }
  }

  const titleText = !currentWatcher ? "Add Watcher" : "Remove Watcher"
  const detailText = !currentWatcher
    ? `Get notified whenever someone in your pickup radius adds ${item.name}`
    : `Stop getting notified for ${item.name}`

  return (
    <View style={{ padding: 10 }}>
      <Text h1 style={{ marginBottom: 15, textDecorationLine: "underline" }}>
        {titleText}
      </Text>
      <QuantitySelector currentQuantity={quantity} onQuantitySelect={setQuantity} item={item} />
      <Text style={{ paddingBottom: 30 }}>{detailText}</Text>
      <Button
        disabled={!quantity}
        loading={loading}
        onPress={handleButtonPress}
        title={!currentWatcher ? "Add Watcher" : "Remove Watcher"}
      />
    </View>
  )
}
