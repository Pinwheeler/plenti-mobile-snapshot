import { ReactNativeFirebase } from "@react-native-firebase/app"
import storage from "@react-native-firebase/storage"
import * as ImagePicker from "expo-image-picker"
import React, { useState } from "react"
import { Dimensions, View } from "react-native"
import { Button, Text, Title } from "react-native-paper"
import { InventoryItem } from "../../../api/models/InventoryItem"
import { LoggedInAccountEntity } from "../../../api/models/LoggedInAccount"
import { Quantity } from "../../../api/models/Quantity"
import { itemForName, PlentiItem } from "../../../assets/PlentiItemsIndex"
import { Logger } from "../../../lib/Logger"
import Theme from "../../../lib/Theme"
import { URLS } from "../../../lib/UrlHelper"
import { ButtonWithStatus } from "../../ButtonWithStatus"
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
  uploadNewProduceImage(
    image: ImagePicker.ImageInfo,
    plentiItem: PlentiItem,
    account: LoggedInAccountEntity,
  ): Promise<any>
}

export const ProduceItemDetails: React.FC<Props> = (props) => {
  const { selectedItem, onClose, loggedInAccount, uploadNewProduceImage, upcertItem } = props
  const [localImage, setLocalImage] = useState<ImagePicker.ImageInfo>()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<ReactNativeFirebase.NativeFirebaseError>()
  const itsAnInventoryItem = isInventoryItem(selectedItem)
  const [quantity, setQuantity] = useState<Quantity | undefined>(itsAnInventoryItem ? selectedItem.quantity : undefined)

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
    if (localImage) {
      await uploadNewProduceImage(localImage, plentiItem, loggedInAccount)
      const url = await storage().ref(URLS.images.produceItem(loggedInAccount, plentiItem)).getDownloadURL()
      imageUrl = url
    }
    upcertItem(plentiItem.name, quantity, imageUrl)
      .then(() => setSuccess(true))
      .catch((error: ReactNativeFirebase.NativeFirebaseError) => setError(error))
      .finally(() => setLoading(false))
  }

  const submitDisabled: boolean = !quantity

  return (
    <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
      <Title style={{ marginBottom: 15, textDecorationLine: "underline" }}>{`Listing: ${displayName}`}</Title>
      {error && <Text style={{ color: Theme.colors.error }}>{error.message}</Text>}
      <QuantitySelectorItem currentQuantity={quantity} quantity={"A Little"} quantitySelected={setQuantity} />
      <QuantitySelectorItem currentQuantity={quantity} quantity={"Some"} quantitySelected={setQuantity} />
      <QuantitySelectorItem currentQuantity={quantity} quantity={"A Lot"} quantitySelected={setQuantity} />
      <ProduceImageSelector
        localImage={localImage}
        imageSize={imageSize}
        plentiItem={plentiItem}
        onLocalImageSelect={setLocalImage}
      />
      <ButtonWithStatus
        success={success}
        loading={loading}
        onPress={listItem}
        disabled={submitDisabled}
        mode="contained"
      >
        {itsAnInventoryItem ? "Update Listing" : "List Item"}
      </ButtonWithStatus>

      <Button
        style={{ marginTop: 15 }}
        onPress={() => {
          onClose()
        }}
        mode="outlined"
      >
        Close
      </Button>
    </View>
  )
}

interface ItemProps {
  quantity: Quantity
  currentQuantity?: Quantity
  quantitySelected: (quantity: Quantity) => void
}

const QuantitySelectorItem: React.FC<ItemProps> = (props) => {
  const { quantitySelected, quantity, currentQuantity } = props
  const selected = quantity === currentQuantity
  return (
    <Button
      color={selected ? Theme.colors.accent : "white"}
      onPress={() => quantitySelected(quantity)}
      mode="contained"
      style={{ marginVertical: 5 }}
    >
      <Text>{props.quantity}</Text>
    </Button>
  )
}
