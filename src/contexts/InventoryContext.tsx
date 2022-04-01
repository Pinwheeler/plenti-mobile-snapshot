import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { InventoryItem, InventoryItemModel } from "../api/models/InventoryItem"
import { Quantity } from "../api/models/Quantity"
import { Logger } from "../lib/Logger"
import { URLS } from "../lib/UrlHelper"
import { AccountContext } from "./AccountContext"

interface IInventoryContext {
  myInventory: Map<string, InventoryItem>
  addItem(itemName: string, quantity: Quantity, imageUri?: string): Promise<void>
  deleteItem(item: InventoryItem): Promise<void>
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

  const addItem = (itemName: string, quantity: Quantity, imageUrl?: string) => {
    if (loggedInAccount) {
      const model = InventoryItem.modelFromUI(itemName, quantity, loggedInAccount, imageUrl)
      return database().ref(URLS.inventoryItem(model)).set(model)
    } else {
      const reason = "Call to addItem made without a logged in account. Something is fishy"
      Logger.warn(reason)
      return Promise.reject(reason)
    }
  }

  const deleteItem = (item: InventoryItem) => {
    if (loggedInAccount) {
      return database().ref(URLS.inventoryItem(item)).remove()
    } else {
      const reason = "Call to deleteItem made without a logged in account. Something is fishy"
      Logger.warn(reason)
      return Promise.reject(reason)
    }
  }

  const value = {
    myInventory,
    addItem,
    deleteItem,
  }

  return <InventoryContext.Provider value={value}>{props.children}</InventoryContext.Provider>
}
