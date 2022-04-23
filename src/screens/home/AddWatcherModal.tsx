import { Button, Text } from "@rneui/themed"
import React, { useContext, useState } from "react"
import { View } from "react-native"
import { Quantity } from "../../api/models/Quantity"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import { QuantitySelector } from "../../components/produce_grid/QuantitySelector"
import { WatcherContext } from "../../contexts/WatcherContext"

interface Props {
  item: PlentiItem
  onClose(): void
}

export const AddWatcherModal: React.FC<Props> = (props) => {
  const { item, onClose } = props
  const { addWatcher } = useContext(WatcherContext)
  const [quantity, setQuantity] = useState<Quantity | undefined>()
  const [loading, setLoading] = useState(false)

  const handleButtonPress = () => {
    if (quantity) {
      setLoading(true)
      addWatcher(item, quantity)
        .then(() => onClose())
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const titleText = "Add Watcher"
  const detailText = `Get notified whenever someone in your pickup radius adds ${item.name}`

  return (
    <View style={{ padding: 10 }}>
      <Text h3 style={{ marginBottom: 15, textDecorationLine: "underline" }}>
        {titleText}
      </Text>
      <QuantitySelector currentQuantity={quantity} onQuantitySelect={setQuantity} item={item} />
      <Text style={{ paddingBottom: 30 }}>{detailText}</Text>
      <Button disabled={!quantity} loading={loading} onPress={handleButtonPress} title={"Add Watcher"} />
    </View>
  )
}
