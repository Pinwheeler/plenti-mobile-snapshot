import { CommonActions, useNavigation } from "@react-navigation/native"
import { Overlay } from "@rneui/themed"
import React, { useState } from "react"

import { PlentiItem } from "../../assets/PlentiItemsIndex"
import ItemSelector from "../../components/item_selector/ItemSelector"
import { ItemSelectorProvider } from "../../components/item_selector/ItemSelectorContext"
import { CatalogRequestButton } from "./CatalogRequestButton"
import { WantStatusModal } from "./WantStatusModal"

const WantSelector: React.FC = () => {
  const navigator = useNavigation()
  const [selectedItem, setSelectedItem] = useState<PlentiItem>()
  const [requestPanelVisible, setRequestPanelVisible] = useState(true)

  const handleClose = () => {
    setSelectedItem(undefined)
    navigator.dispatch(CommonActions.navigate({ key: "Connect" }))
  }

  return (
    <>
      <ItemSelectorProvider>
        <ItemSelector onItemSelect={setSelectedItem} />
        <Overlay overlayStyle={{ margin: 20 }} isVisible={!!selectedItem}>
          {selectedItem ? <WantStatusModal item={selectedItem} onClose={handleClose} /> : null}
        </Overlay>
      </ItemSelectorProvider>
      {requestPanelVisible && (
        <CatalogRequestButton
          onClose={() => setRequestPanelVisible(false)}
          style={{ position: "absolute", bottom: 100 }}
        />
      )}
    </>
  )
}

export default WantSelector
