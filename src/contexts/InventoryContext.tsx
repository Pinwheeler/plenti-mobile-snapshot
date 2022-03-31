import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { InventoryItem, InventoryItemModel } from "../api/models/InventoryItem"
import { Quantity } from "../api/models/Quantity"
import { Logger } from "../lib/Logger"
import { URLS } from "../lib/UrlHelper"
import { AccountContext } from "./AccountContext"

interface IInventoryContext {
  myInventory: Map<string, InventoryItem>
  addItem(itemName: string, quantity: Quantity): void
  deleteItem(item: InventoryItem): void
}

export const InventoryContext = React.createContext<IInventoryContext>({} as IInventoryContext)

export const InventoryProvider: React.FC = (props) => {
  const { loggedInAccount } = useContext(AccountContext)
  const [myInventory, setMyInventory] = useState(new Map<string, InventoryItem>())

  useEffect(() => {
    if (loggedInAccount !== undefined) {
      const path = `/inventories/${loggedInAccount.uid}`
      const onInventoryChange = database()
        .ref(path)
        .on("value", (snapshot) => {
          const val = snapshot.val() as { [key: string]: InventoryItemModel }
          const result: Map<string, InventoryItem> = new Map()
          for (const key in val) {
            const model = val[key]
            result.set(key, new InventoryItem(model))
          }
          setMyInventory(result)
        })

      return () => database().ref(path).off("value", onInventoryChange)
    }
  }, [loggedInAccount])

  const addItem = (itemName: string, quantity: Quantity) => {
    if (loggedInAccount) {
      const model = InventoryItem.modelFromUI(itemName, quantity, loggedInAccount)
      database().ref(URLS.inventoryItem(model)).push(model)
    } else {
      Logger.warn("Call to addItem made without a logged in account. Something is fishy")
    }
  }

  const deleteItem = (item: InventoryItem) => {
    if (loggedInAccount) {
      database().ref(URLS.inventoryItem(item)).remove()
    } else {
      Logger.warn("Call to deleteItem made without a logged in account. Something is fishy")
    }
  }

  const value = {
    myInventory,
    addItem,
    deleteItem,
  }

  return <InventoryContext.Provider value={value}>{props.children}</InventoryContext.Provider>
}
