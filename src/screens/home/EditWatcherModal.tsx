import { Button, Text, useTheme } from "@rneui/themed"
import React, { useContext, useState } from "react"
import { View } from "react-native"
import { PlentiWatcher } from "../../api/models/PlentiWatcher"
import { Quantity } from "../../api/models/Quantity"
import { QuantitySelector } from "../../components/produce_grid/QuantitySelector"
import { WatcherContext } from "../../contexts/WatcherContext"

interface Props {
  watcher: PlentiWatcher
  onClose(): void
}

export const EditWatcherModal: React.FC<Props> = (props) => {
  const { watcher, onClose } = props
  const { removeWatcher, addWatcher } = useContext(WatcherContext)
  const [quantity, setQuantity] = useState<Quantity>(watcher.quantity)
  const [loading, setLoading] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const { theme } = useTheme()

  const handleUpdate = () => {
    setLoading(true)
    addWatcher(watcher.plentiItemName, quantity)
      .then(() => onClose())
      .catch(() => setLoading(false))
  }

  const handleDelete = () => {
    if (!confirmingDelete) {
      setConfirmingDelete(true)
    } else {
      setLoading(true)
      removeWatcher(watcher.plentiItemName)
        .then(() => onClose)
        .catch(() => setLoading(false))
    }
  }

  return (
    <View style={{ padding: 10, backgroundColor: theme.colors.background }}>
      <Text h3 style={{ marginBottom: 15, textDecorationLine: "underline" }}>
        Edit Watcher
      </Text>
      <QuantitySelector currentQuantity={quantity} onQuantitySelect={setQuantity} itemName={watcher.plentiItemName} />
      <Text
        style={{ paddingBottom: 30 }}
      >{`Update how many ${watcher.plentiItemName} you care about or remove this watcher to stop recieving notifications`}</Text>
      <View style={{ flexDirection: "row", marginBottom: 6 }}>
        <Button type="outline" containerStyle={{ flex: 1, marginRight: 3 }} onPress={onClose} title={"Close"} />
        <Button containerStyle={{ flex: 1, marginLeft: 3 }} loading={loading} onPress={handleUpdate} title="Update" />
      </View>
      <Button
        type={confirmingDelete ? "solid" : "outline"}
        buttonStyle={{
          backgroundColor: confirmingDelete ? theme.colors.error : undefined,
          borderColor: confirmingDelete ? undefined : theme.colors.error,
        }}
        titleStyle={{ color: confirmingDelete ? theme.colors.white : theme.colors.error }}
        loading={loading}
        onPress={handleDelete}
        title={confirmingDelete ? "Confirm" : "Delete Watcher"}
      />
    </View>
  )
}
