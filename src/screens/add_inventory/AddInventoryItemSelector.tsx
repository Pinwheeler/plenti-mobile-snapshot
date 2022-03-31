import { CommonActions, useNavigation } from "@react-navigation/native"
import React, { useContext, useState } from "react"
import { Quantity } from "../../api/models/Quantity"
import ActivityOverlay from "../../components/ActivityOverlay"
import { TopInfoBar } from "../../components/TopInfoBar"
import { InventoryContext } from "../../contexts/InventoryContext"
import { ItemSelectorProvider } from "../../components/item_selector/ItemSelectorContext"
import ItemSelector from "../../components/item_selector/ItemSelector"

const AddInventoryItemSelector: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { addItem } = useContext(InventoryContext)
  const navigation = useNavigation()

  const addAndNavigate = (itemName: string, quantity: Quantity) => {
    setLoading(true)
    addItem(itemName, quantity)
    navigation.dispatch(CommonActions.navigate({name:"Plenti"}))
  }

  if (loading) {
    return <ActivityOverlay loadingMessage="Adding to your inventory..." />
  } else {
    return (
      <ItemSelectorProvider>
        <TopInfoBar text="What kind of produce?" />
        <ItemSelector itemAndQuantitySelected={addAndNavigate} />
      </ItemSelectorProvider>
    )
  }
}

export default AddInventoryItemSelector
