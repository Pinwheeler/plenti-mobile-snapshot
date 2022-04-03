import { CommonActions, useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Modal, Portal } from "react-native-paper"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import ItemSelector from "../../components/item_selector/ItemSelector"
import { ItemSelectorProvider } from "../../components/item_selector/ItemSelectorContext"
import { CatalogRequestButton } from "./CatalogRequestButton"
import { WantStatusModal } from "./WantStatusModal"

const WantSelector: React.FC = () => {
  const navigator = useNavigation()
  const [selectedItem, setSelectedItem] = useState<PlentiItem>()

  const handleClose = () => {
    setSelectedItem(undefined)
    navigator.dispatch(CommonActions.navigate({ key: "Connect" }))
  }

  return (
    <>
      <ItemSelectorProvider>
        <ItemSelector onItemSelect={setSelectedItem} />
        <Portal>
          <Modal visible={!!selectedItem}>
            {selectedItem ? <WantStatusModal item={selectedItem} onClose={handleClose} /> : null}
          </Modal>
        </Portal>
      </ItemSelectorProvider>
      <CatalogRequestButton style={{ position: "absolute", bottom: 100 }} />
    </>
  )
}

export default WantSelector
