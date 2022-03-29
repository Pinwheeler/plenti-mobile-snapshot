import React, { useState } from "react"
import { PlentiItem } from "../../assets/PlentiItemsIndex"

interface IItemSelectorContext {
  selectedItem?: PlentiItem
  setSelectedItem: (item?: PlentiItem) => void
}

export const ItemSelectorContext = React.createContext({} as IItemSelectorContext)

export const ItemSelectorProvider: React.FC = (props) => {
  const [selectedItem, setSelectedItem] = useState<PlentiItem>()

  const value = { selectedItem, setSelectedItem }
  return <ItemSelectorContext.Provider value={value}>{props.children}</ItemSelectorContext.Provider>
}
