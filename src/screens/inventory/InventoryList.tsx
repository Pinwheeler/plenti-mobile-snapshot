import { CommonActions, useNavigation } from "@react-navigation/native"
import { Button, Overlay, Text } from "@rneui/themed"
import React, { useContext, useState } from "react"
import { ScrollView, View } from "react-native"

import { InventoryItem } from "../../api/models/InventoryItem"
import { Quantity } from "../../api/models/Quantity"
import { IconButton } from "../../components/IconButton"
import { ProduceItemDetails } from "../../components/produce_grid/modify_inventory/ProduceItemDetails"
import { ProduceGrid } from "../../components/produce_grid/ProduceGrid"
import { AccountContext } from "../../contexts/AccountContext"
import { ImageContext } from "../../contexts/ImageContext"
import { InventoryContext } from "../../contexts/InventoryContext"
import { StringMapFromObj } from "../../lib/DatabaseHelpers"
import { Logger } from "../../lib/Logger"
import Theme from "../../lib/Theme"
import { InventoryItemGridItem } from "./InventoryItemGridItem"

export const InventoryList = () => {
  const { loggedInAccount } = useContext(AccountContext)
  const { myInventory, addItem, deleteItem } = useContext(InventoryContext)
  const { uploadNewProduceImage } = useContext(ImageContext)
  const [locationGateVisible, setLocationGateVisible] = useState(false)
  const [loginGateVisible, setLoginGateVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem>()
  const navigation = useNavigation()

  const goToAccount = () => {
    navigation.dispatch(CommonActions.navigate({ name: "Profile" }))
    onClose()
  }

  const onClose = () => {
    setLocationGateVisible(false)
    setLoginGateVisible(false)
  }

  const goToProfile = () => {
    setLocationGateVisible(false)
    setLoginGateVisible(false)
    navigation.dispatch(CommonActions.navigate({ name: "Profile" }))
  }

  const onAdd = () => {
    if (loggedInAccount === undefined) {
      setLoginGateVisible(true)
    } else {
      if (myInventory) {
        navigation.dispatch(CommonActions.navigate({ name: "AddInventoryItem" }))
      } else {
        setLocationGateVisible(true)
      }
    }
  }

  const onEdit = (item: InventoryItem) => {
    setSelectedItem(item)
  }

  const handleUpcertItem = (itemName: string, quantity: Quantity, imageUri?: string | undefined) => {
    return addItem(itemName, quantity, imageUri)
      .then(() => setSelectedItem(undefined))
      .finally(() => setSelectedItem(undefined))
  }

  const handleDeleteItem = (item?: InventoryItem) =>
    item ? deleteItem(item) : Logger.warn("attempted to delete undefined item")

  const Content = () => {
    if (myInventory) {
      const map = StringMapFromObj(myInventory.items)
      if (map.size > 0) {
        return (
          <ProduceGrid>
            {Array.from(map).map(([_key, item]) => (
              <InventoryItemGridItem onPress={() => onEdit(item)} inventoryItem={item} key={item.uid} />
            ))}
          </ProduceGrid>
        )
      }
    }
    return (
      <ScrollView>
        <Text style={{ textAlign: "center", color: Theme.colors.disabled }}>No Inventory Items Found</Text>
        <Text style={{ textAlign: "center", color: Theme.colors.disabled }}>
          Use the button on this page to add an Inventory Item
        </Text>
      </ScrollView>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Content />
      <IconButton
        type={"plus"}
        onPress={onAdd}
        color="white"
        size={30}
        style={{ position: "absolute", right: 15, bottom: 15, backgroundColor: Theme.colors.primary }}
      />
      <Overlay isVisible={!!selectedItem} onBackdropPress={() => setSelectedItem(undefined)}>
        <ProduceItemDetails
          upcertItem={handleUpcertItem}
          uploadNewProduceImage={uploadNewProduceImage}
          loggedInAccount={loggedInAccount!}
          selectedItem={selectedItem}
          onClose={() => setSelectedItem(undefined)}
          onDelete={() => handleDeleteItem(selectedItem)}
        />
      </Overlay>
      <Overlay isVisible={locationGateVisible} onBackdropPress={onClose}>
        <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
          <Text h1>Error</Text>
          <Text style={{ marginVertical: 15, textAlign: "center" }}>
            You must have a Pickup Location (latitude/longitude) set before you can add to your inventory.
          </Text>
          <Text style={{ marginTop: 15, textAlign: "center" }}>You can set this up on the</Text>
          <Text style={{ textAlign: "center" }}>Profile Screen</Text>
          <Button onPress={goToProfile} style={{ marginTop: 15 }}>
            Go To Profile Screen
          </Button>
          <Button style={{ marginTop: 20 }} onPress={onClose}>
            {/**mode="outlined" */}
            Close
          </Button>
        </View>
      </Overlay>
      <Overlay isVisible={loginGateVisible} onBackdropPress={onClose}>
        <View style={{ backgroundColor: "white", padding: 15, margin: 15 }}>
          <Text h1>Error</Text>
          <Text style={{ marginVertical: 15, textAlign: "center" }}>
            You must have an account to add to your Inventory.
          </Text>
          <Button onPress={goToAccount} style={{ marginBottom: 15 }}>
            Go To Login
          </Button>
          <Button onPress={onClose}>
            {/**mode="outlined" */}
            Close
          </Button>
        </View>
      </Overlay>
    </View>
  )
}
