import { Overlay } from "@rneui/themed"
import React, { useState } from "react"
import { PlentiItem } from "../../assets/PlentiItemsIndex"
import ItemSelector from "../../components/item_selector/ItemSelector"
import { ItemSelectorProvider } from "../../components/item_selector/ItemSelectorContext"
import { AddWatcherModal } from "./AddWatcherModal"
import { CatalogRequestButton } from "./CatalogRequestButton"

const WantSelector: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PlentiItem>()
  const [requestPanelVisible, setRequestPanelVisible] = useState(true)

  const handleClose = () => {
    setSelectedItem(undefined)
  }

  return (
    <>
      <ItemSelectorProvider>
        <ItemSelector onItemSelect={setSelectedItem} />
        <Overlay overlayStyle={{ margin: 20 }} isVisible={!!selectedItem}>
          {selectedItem ? <AddWatcherModal item={selectedItem} onClose={handleClose} /> : null}
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
