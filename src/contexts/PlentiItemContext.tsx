import React from "react"
import { AllPlentiItems, PlentiItem } from "../assets/PlentiItemsIndex"

interface IPlentiItemContext {
  plentiItems: PlentiItem[]
  itemForName(id: string): PlentiItem | undefined
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

  const itemForName = (name: string) => plentiItems.find((item) => item.name === name)

  const value = {
    plentiItems,
    itemForName
  }

  return <PlentiItemContext.Provider value={value}>{props.children}</PlentiItemContext.Provider>
}

