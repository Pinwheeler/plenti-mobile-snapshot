import { ReactNativeFirebase } from "@react-native-firebase/app"
import storage from "@react-native-firebase/storage"
import { Button, Text, useTheme } from "@rneui/themed"
import React, { useState } from "react"
import { Dimensions, View } from "react-native"
import { InventoryItem } from "../../../api/models/InventoryItem"
import { LoggedInAccountEntity } from "../../../api/models/LoggedInAccount"
import { Quantity } from "../../../api/models/Quantity"
import { itemForName, PlentiItem } from "../../../assets/PlentiItemsIndex"
import { URLS } from "../../../lib/DatabaseHelpers"
import { Logger } from "../../../lib/Logger"
import { capitalize } from "../../../lib/StringHelpers"
import { QuantitySelectorItem } from "../../QuantitySelectorItem"
import { ProduceImageSelector } from "./ProduceImageSelector"

function isInventoryItem(item: PlentiItem | InventoryItem | undefined): item is InventoryItem {
  if (item) {
    return (item as InventoryItem).quantity !== undefined
  }
  return false
}

interface Props {
  selectedItem?: PlentiItem | InventoryItem
  onClose(): void
  listing?: InventoryItem
  loggedInAccount?: LoggedInAccountEntity
  upcertItem(itemName: string, quantity: Quantity, imageUri?: string): Promise<void>
  uploadNewProduceImage(uri: string, plentiItem: PlentiItem, account: LoggedInAccountEntity): Promise<any>
  onDelete?(): void
}

export const ProduceItemDetails: React.FC<Props> = (props) => {
  const { selectedItem, onClose, loggedInAccount, uploadNewProduceImage, upcertItem, onDelete } = props
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<ReactNativeFirebase.NativeFirebaseError>()
  const itsAnInventoryItem = isInventoryItem(selectedItem)
  const [quantity, setQuantity] = useState<Quantity | undefined>(itsAnInventoryItem ? selectedItem.quantity : undefined)
  const [userImageUri, setUserImageUri] = useState<string | undefined>(
    itsAnInventoryItem ? selectedItem.imageUrl : undefined,
  )
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const { theme } = useTheme()

  if (!selectedItem) {
    return null
  }

  if (!loggedInAccount) {
    Logger.error("Listing produce item without a logged in account")
    return null
  }

  const plentiItem = itsAnInventoryItem ? itemForName(selectedItem.plentiItemName) : selectedItem

  if (!plentiItem) {
    Logger.error(`Failed to retrieve plenti item from object: ${JSON.stringify(selectedItem)}`)
    return null
  }

  const displayName = plentiItem.name
  const imageSize = Dimensions.get("window").width * 0.35

  const listItem = async () => {
    setError(undefined)
    if (!quantity) {
      Logger.error("Attempting to list item without a quantity")
      return
    }
    setLoading(true)
    let imageUrl: string | undefined
    if (userImageUri) {
      await uploadNewProduceImage(userImageUri, plentiItem, loggedInAccount)
      const url = await storage().ref(URLS.images.produceItem(loggedInAccount, plentiItem)).getDownloadURL()
      imageUrl = url
    }
    upcertItem(plentiItem.name, quantity, imageUrl)
      .then(() => setSuccess(true))
      .catch((error: ReactNativeFirebase.NativeFirebaseError) => setError(error))
      .finally(() => setLoading(false))
  }

  const submitDisabled: boolean = !quantity

  const handleDeletePressed = () => {
    if (confirmingDelete && onDelete) {
      onDelete()
      setConfirmingDelete(false)
      onClose()
    } else {
      setConfirmingDelete(true)
    }
  }

  return (
    <View style={{ backgroundColor: "white", padding: 15 }}>
      <Text h3 style={{ marginBottom: 15, textDecorationLine: "underline" }}>{`Listing: ${capitalize(
        displayName,
      )}`}</Text>
      {error && <Text style={{ color: theme.colors.error }}>{error.message}</Text>}
      <QuantitySelectorItem currentQuantity={quantity} quantity={"A Little"} quantitySelected={setQuantity} />
      <QuantitySelectorItem currentQuantity={quantity} quantity={"Some"} quantitySelected={setQuantity} />
      <QuantitySelectorItem currentQuantity={quantity} quantity={"A Lot"} quantitySelected={setQuantity} />
      <ProduceImageSelector
        userImageUri={userImageUri}
        imageSize={imageSize}
        plentiItem={plentiItem}
        onLocalImageSelect={setUserImageUri}
      />
      <View style={{ flexDirection: "row" }}>
        <Button
          type="outline"
          containerStyle={{ flex: 1, marginRight: 10 }}
          onPress={() => {
            onClose()
          }}
          title="Close"
        />
        <Button
          loading={loading}
          onPress={listItem}
          disabled={submitDisabled}
          title={itsAnInventoryItem ? "Update Listing" : "List Item"}
        />
      </View>
      {itsAnInventoryItem && (
        <Button
          onPress={handleDeletePressed}
          type={confirmingDelete ? "solid" : "outline"}
          buttonStyle={{
            marginTop: 15,
            backgroundColor: confirmingDelete ? theme.colors.error : undefined,
            borderColor: confirmingDelete ? undefined : theme.colors.error,
          }}
          titleStyle={{ color: confirmingDelete ? theme.colors.white : theme.colors.error }}
          title={confirmingDelete ? "Confirm" : "Delete Listing"}
        />
      )}
    </View>
  )
}
