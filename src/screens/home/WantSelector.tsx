import React, { useContext } from "react"
import { ItemSelectorProvider } from "src/item_grid/ItemSelectorContext"
import ItemSelector from "src/item_grid/ItemSelector"
import WantSelectorContext from "src/want/WantSelectorContext"
import { Modal, Portal } from "react-native-paper"
import WantStatusModal from "./WantStatusModal"
import CatalogRequestButton from "../catalog_request/CatalogRequestButton"
import { useNavigation } from "@react-navigation/native"

const WantSelector: React.FC = () => {
  const { makeRequest, makingRequestPromise, clearRequest } = useContext(WantSelectorContext)
  const navigator = useNavigation()

  const goToWants = () => {
    clearRequest()
    navigator.navigate("Connect")
  }

  return (
    <>
      <ItemSelectorProvider>
        <ItemSelector itemAndQuantitySelected={makeRequest} />
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
