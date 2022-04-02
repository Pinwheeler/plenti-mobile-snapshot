import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { InventoryItem } from "../api/models/InventoryItem"
import { PlentiWatcher } from "../api/models/PlentiWatcher"
import { Quantity } from "../api/models/Quantity"
import { PlentiItem } from "../assets/PlentiItemsIndex"
import { handleUnauthenticatedRequest, URLS } from "../lib/DatabaseHelpers"
import { AccountContext } from "./AccountContext"

interface IInventoryContext {
  myInventory: Map<string, InventoryItem>
  myWatchers: Map<string, PlentiWatcher>
  addItem(itemName: string, quantity: Quantity, imageUri?: string): Promise<void>
  deleteItem(item: InventoryItem): Promise<void>
  addWatcher(item: PlentiItem, quantity: Quantity): Promise<void>
  removeWatcher(item: PlentiItem): Promise<void>
}

export const InventoryContext = React.createContext<IInventoryContext>({} as IInventoryContext)

export const InventoryProvider: React.FC = (props) => {
  const { loggedInAccount } = useContext(AccountContext)
  const [myInventory, setMyInventory] = useState(new Map<string, InventoryItem>())
  const [myWatchers, setMyWatchers] = useState(new Map<string, PlentiWatcher>())

  useEffect(() => {
    if (loggedInAccount) {
      const path = URLS.inventory(loggedInAccount)
      const onInventoryChange = database()
        .ref(path)
        .on("value", (snapshot) => setMyInventory(new Map(snapshot.val())))
      return () => database().ref(path).off("value", onInventoryChange)
    }
  }, [loggedInAccount])

  useEffect(() => {
    if (loggedInAccount) {
      const path = URLS.watchers(loggedInAccount)
      const onWatchersChange = database()
        .ref(path)
        .on("value", (snapshot) => setMyWatchers(new Map(snapshot.val())))
      return () => database().ref(path).off("value", onWatchersChange)
    }
  })

  const addWatcher = (item: PlentiItem, quantity: Quantity) => {
    if (loggedInAccount) {
      const watcher: PlentiWatcher = {
        plentiItemName: item.name,
        quantity,
        accountUid: loggedInAccount.uid,
      }
      return database().ref(URLS.watchersForItem(loggedInAccount, item)).set(watcher)
    }
    return handleUnauthenticatedRequest("addWatcher")
  }

  const removeWatcher = (item: PlentiItem) => {
    if (loggedInAccount) {
      return database().ref(URLS.watchersForItem(loggedInAccount, item)).remove()
    }
    return handleUnauthenticatedRequest("removeHandler")
  }

  const addItem = (itemName: string, quantity: Quantity, imageUrl?: string) => {
    if (loggedInAccount) {
      const model = InventoryItem.modelFromUI(itemName, quantity, loggedInAccount, imageUrl)
      return database().ref(URLS.inventoryItem(model)).set(model)
    } else {
      return handleUnauthenticatedRequest("addItem")
    }
  }

  const deleteItem = (item: InventoryItem) => {
    if (loggedInAccount) {
      return database().ref(URLS.inventoryItem(item)).remove()
    } else {
      return handleUnauthenticatedRequest("deleteItem")
    }
  }

  const value = {
    myInventory,
    myWatchers,
    addItem,
    deleteItem,
    addWatcher,
    removeWatcher,
  }

  return <InventoryContext.Provider value={value}>{props.children}</InventoryContext.Provider>
}
