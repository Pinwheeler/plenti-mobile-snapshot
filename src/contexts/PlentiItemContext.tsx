import React from "react"
import { AllPlentiItems, PlentiItem } from "../assets/PlentiItemsIndex"

interface IPlentiItemContext {
  plentiItems: PlentiItem[]
  itemForId(id: number): PlentiItem | undefined
}

export const PlentiItemContext = React.createContext<IPlentiItemContext>({} as IPlentiItemContext)

export const PlentiItemProvider: React.FC = (props) => {
  const plentiItems = [...AllPlentiItems].sort((a: PlentiItem, b: PlentiItem) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name < b.name) {
      return 1
    }
    return 0
  })

  const itemForId = (id: number) => plentiItems.find((item) => item.id === id)

  const value = {
    plentiItems,
    itemForId
  }

  return <PlentiItemContext.Provider value={value}>{props.children}</PlentiItemContext.Provider>
}

