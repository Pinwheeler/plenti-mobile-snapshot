import { CommonActions, useNavigation } from "@react-navigation/native"
import { Overlay } from "@rneui/themed"
import React, { useContext, useState } from "react"

import { Quantity } from "../../api/models/Quantity"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import ItemSelector from "../../components/item_selector/ItemSelector"
import LoggedInGate from "../../components/LoggedInGate"
import { ProduceItemDetails } from "../../components/produce_grid/modify_inventory/ProduceItemDetails"
import { TopInfoBar } from "../../components/TopInfoBar"
import { AccountContext } from "../../contexts/AccountContext"
import { ImageContext } from "../../contexts/ImageContext"
import { InventoryContext } from "../../contexts/InventoryContext"

export const AddInventoryItemScreen = () => {
  const { addItem } = useContext(InventoryContext)
  const { loggedInAccount } = useContext(AccountContext)
  const { uploadNewProduceImage } = useContext(ImageContext)
  const navigation = useNavigation()
  const [selectedItem, setSelectedItem] = useState<PlentiItem>()

  const goToAccount = () => {
    setSelectedItem(undefined)
    navigation.dispatch(CommonActions.navigate({ name: "Profile" }))
  }

  const handleAddItem = (itemName: string, quantity: Quantity, imageUri?: string | undefined) => {
    return addItem(itemName, quantity, imageUri)
      .then(() => setSelectedItem(undefined))
      .finally(() => navigation.goBack())
  }
  return (
    <>
      <TopInfoBar text="What kind of produce?" />
      <ItemSelector onItemSelect={setSelectedItem} />
      <Overlay style={{ margin: 20 }} isVisible={!!selectedItem} onDismiss={() => setSelectedItem(undefined)}>
        <LoggedInGate onClose={() => setSelectedItem(undefined)} account={loggedInAccount} goToAccount={goToAccount}>
          <ProduceItemDetails
            upcertItem={handleAddItem}
            uploadNewProduceImage={uploadNewProduceImage}
            loggedInAccount={loggedInAccount!}
            selectedItem={selectedItem}
            onClose={() => setSelectedItem(undefined)}
          />
        </LoggedInGate>
      </Overlay>
    </>
  )
}

AddInventoryItemScreen.navigationOptions = {
  title: "Add Inventory Item",
}
