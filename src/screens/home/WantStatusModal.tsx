import React, { useContext, useState } from "react"
import { Text, View } from "react-native"
import { Title } from "react-native-paper"
import { Quantity } from "../../api/models/Quantity"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import { ButtonWithStatus } from "../../components/ButtonWithStatus"
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
        addWatcher(item, quantity).finally(() => setLoading(false))
      } else {
        removeWatcher(item).finally(() => setLoading(false))
      }
    }
  }

  const titleText = !currentWatcher ? "Add Watcher" : "Remove Watcher"
  const detailText = !currentWatcher
    ? `Get notified whenever someone in your pickup radius adds ${item.name}`
    : `Stop getting notified for ${item.name}`

  return (
    <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
      <Title style={{ marginBottom: 15, textDecorationLine: "underline" }}>{titleText}</Title>
      <QuantitySelector quantitySelected={setQuantity} selectedItem={item} />
      <Text style={{ paddingBottom: 30 }}>{detailText}</Text>
      <ButtonWithStatus disabled={!quantity} loading={loading} onPress={handleButtonPress}>
        {!currentWatcher ? "Add Watcher" : "Remove Watcher"}
      </ButtonWithStatus>
    </View>
  )
}
