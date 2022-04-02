import { CommonActions, useNavigation } from "@react-navigation/native"
import React, { useContext } from "react"
import { Modal, Portal } from "react-native-paper"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import ItemSelector from "../../components/item_selector/ItemSelector"
import { ItemSelectorProvider } from "../../components/item_selector/ItemSelectorContext"
import { InventoryContext } from "../../contexts/InventoryContext"

const WantSelector: React.FC = () => {
  const { addWatcher, removeWatcher } = useContext(InventoryContext)
  const navigator = useNavigation()

  const goToWants = () => {
    navigator.dispatch(CommonActions.navigate({ key: "Connect" }))
  }

  const handleItemSelected = (item: PlentiItem) => {}

  return (
    <>
      <ItemSelectorProvider>
        <ItemSelector onItemSelect={handleItemSelected} />
        <Portal>
          <Modal visible={makingRequestPromise !== undefined}>
            <WantStatusModal promise={makingRequestPromise} clearRequest={clearRequest} goToWants={goToWants} />
          </Modal>
        </Portal>
      </ItemSelectorProvider>
      <CatalogRequestButton style={{ position: "absolute", bottom: 100 }} />
    </>
  )
}

export default WantSelector
