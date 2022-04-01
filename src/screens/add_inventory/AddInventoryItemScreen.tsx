import { useNavigation } from "@react-navigation/native"
import React from "react"
import ItemSelector from "../../components/item_selector/ItemSelector"
import { TopInfoBar } from "../../components/TopInfoBar"

const AddInventoryItemScreen = () => {
  const navigation = useNavigation()
  return (
    <>
      <TopInfoBar text="What kind of produce?" />
      <ItemSelector onComplete={() => navigation.goBack()} />
    </>
  )
}

AddInventoryItemScreen.navigationOptions = {
  title: "Add Inventory Item",
}

export default AddInventoryItemScreen
