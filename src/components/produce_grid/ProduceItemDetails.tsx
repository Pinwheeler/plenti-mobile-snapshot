import { ReactNativeFirebase } from "@react-native-firebase/app"
import storage from "@react-native-firebase/storage"
import * as ImagePicker from "expo-image-picker"
import React, { useState } from "react"
import { Dimensions, Image, Pressable, View } from "react-native"
import { Button, Text, Title, TouchableRipple } from "react-native-paper"
import { InventoryItem } from "../../api/models/InventoryItem"
import { LoggedInAccountEntity } from "../../api/models/LoggedInAccount"
import { Quantity } from "../../api/models/Quantity"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import { Logger } from "../../lib/Logger"
import Theme from "../../lib/Theme"
import { URLS } from "../../lib/UrlHelper"
import { ButtonWithStatus } from "../ButtonWithStatus"
import { Icon } from "../Icon"

interface Props {
  selectedItem?: PlentiItem
  onClose(): void
  listing?: InventoryItem
  loggedInAccount?: LoggedInAccountEntity
  addItem(itemName: string, quantity: Quantity, imageUri?: string): Promise<void>
  uploadNewProduceImage(
    image: ImagePicker.ImageInfo,
    plentiItem: PlentiItem,
    account: LoggedInAccountEntity,
  ): Promise<any>
}

export const ProduceItemDetails: React.FC<Props> = (props) => {
  const { selectedItem, onClose, loggedInAccount, uploadNewProduceImage, addItem } = props
  const [quantity, setQuantity] = useState<Quantity>()
  const [localImage, setLocalImage] = useState<ImagePicker.ImageInfo>()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<ReactNativeFirebase.NativeFirebaseError>()

  if (!selectedItem) {
    return null
  }

  if (!loggedInAccount) {
    Logger.error("Listing produce item without a logged in account")
    return null
  }

  const displayName = selectedItem.name
  const imageSize = Dimensions.get("window").width * 0.35

  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.cancelled) {
      setLocalImage(result)
    }
  }

  const listItem = async () => {
    setError(undefined)
    if (!quantity) {
      Logger.error("Attempting to list item without a quantity")
      return
    }
    setLoading(true)
    let imageUrl: string | undefined
    if (localImage) {
      await uploadNewProduceImage(localImage, selectedItem, loggedInAccount)
      const url = await storage().ref(URLS.images.produceItem(loggedInAccount, selectedItem)).getDownloadURL()
      imageUrl = url
    }
    addItem(selectedItem.name, quantity, imageUrl)
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

      {localImage ? (
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: 10,
              marginVertical: 15,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Image
              source={localImage}
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: 10,
                borderWidth: 4,
                borderColor: Theme.colors.accent,
              }}
            />
            <Pressable
              onPress={() => setLocalImage(undefined)}
              style={{
                backgroundColor: Theme.colors.accent,
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <Icon type="times-circle" color="white" size={24} />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginVertical: 15 }}>
          <Image
            source={selectedItem.localImage}
            style={{ width: imageSize, height: imageSize, borderRadius: 10 }}
            resizeMode="cover"
          />
          <TouchableRipple
            onPress={selectImage}
            style={{ width: imageSize, height: imageSize, alignItems: "center", justifyContent: "center" }}
          >
            <>
              <View
                style={{
                  backgroundColor: Theme.colors.notification,
                  width: "55%",
                  height: "55%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                  marginBottom: 10,
                }}
              >
                <Icon color="white" size={32} type="camera" />
              </View>
              <Text>Add Photo</Text>
              <Text>(Optional)</Text>
            </>
          </TouchableRipple>
        </View>
      )}

      <ButtonWithStatus
        success={success}
        loading={loading}
        onPress={listItem}
        disabled={submitDisabled}
        mode="contained"
      >
        List Item
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
