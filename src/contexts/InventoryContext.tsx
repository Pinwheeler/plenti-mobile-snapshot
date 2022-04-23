import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { Inventory } from "../api/models/Inventory.model"
import { InventoryItem, inventoryItemFromUI } from "../api/models/InventoryItem"
import { Quantity } from "../api/models/Quantity"
import { handleUnauthenticatedRequest, URLS } from "../lib/DatabaseHelpers"
import { AccountContext } from "./AccountContext"
import { WatcherContext } from "./WatcherContext"

interface IInventoryContext {
  myInventory?: Inventory
  addItem(itemName: string, quantity: Quantity, imageUri?: string): Promise<void>
  deleteItem(item: InventoryItem): Promise<void>
  usernameForItem(item: InventoryItem): Promise<string>
}

export const InventoryContext = React.createContext<IInventoryContext>({} as IInventoryContext)

export const InventoryProvider: React.FC = (props) => {
  const { loggedInAccount } = useContext(AccountContext)
  const { notifyWatchersInRange } = useContext(WatcherContext)
  const [myInventory, setMyInventory] = useState<Inventory>()

  const usernameForItem = (item: InventoryItem) =>
    database()
      .ref(`/accounts/${item.accountUid}/username`)
      .once("value")
      .then((snapshot) => snapshot.val() as string)

  useEffect(() => {
    if (loggedInAccount) {
      const path = URLS.inventory(loggedInAccount)
      const onInventoryChange = database()
        .ref(path)
        .on("value", (snapshot) => setMyInventory(snapshot.val()))
      return () => database().ref(path).off("value", onInventoryChange)
    }
  }, [loggedInAccount])

  const addItem = async (itemName: string, quantity: Quantity, imageUrl?: string) => {
    if (loggedInAccount) {
      const model = inventoryItemFromUI(itemName, quantity, loggedInAccount, imageUrl)
      await database().ref(URLS.inventoryItem(model)).set(model)
      return notifyWatchersInRange(model)
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
    addItem,
    deleteItem,
    usernameForItem,
  }

  return <InventoryContext.Provider value={value}>{props.children}</InventoryContext.Provider>
}
