import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { InventoryItem } from "../api/models/InventoryItem"
import { PlentiWatcher } from "../api/models/PlentiWatcher"
import { Quantity } from "../api/models/Quantity"
import { PlentiItem } from "../assets/PlentiItemsIndex"
import { handleUnauthenticatedRequest, StringMapFromObj, URLS } from "../lib/DatabaseHelpers"
import { APPRX_KM_IN_DEG, DEFAULT_MAX_KM_DIST } from "../lib/DistanceHelpers"
import { AccountContext } from "./AccountContext"
import { LocationContext } from "./LocationContext"
import { PremiumContext } from "./PremiumContext"

interface IWatcherContext {
  myWatchedItems: string[]
  addWatcher(item: PlentiItem, quantity: Quantity): Promise<any>
  removeWatcher(item: PlentiItem): Promise<any>
  notifyWatchersInRange(item: InventoryItem): Promise<any>
}

export const WatcherContext = React.createContext({} as IWatcherContext)

export const WatcherProvider: React.FC = (props) => {
  const { loggedInAccount } = useContext(AccountContext)
  const { hasPremium } = useContext(PremiumContext)
  const { lastKnownPosition, distanceInKMToPoint } = useContext(LocationContext)
  const [myWatchedItems, setMyWatchedItems] = useState<string[]>([])

  useEffect(() => {
    if (loggedInAccount && hasPremium) {
      const path = `${URLS.account.secure(loggedInAccount)}/myWatchedItems`
      const myWatchedItemsChange = database()
        .ref(path)
        .on("value", (snapshot) => setMyWatchedItems(Array.from(StringMapFromObj(snapshot.val()).keys())))
      return () => database().ref(path).off("value", myWatchedItemsChange)
    }
  }, [loggedInAccount, hasPremium])

  const addWatcher = (item: PlentiItem, quantity: Quantity) => {
    if (loggedInAccount && lastKnownPosition) {
      const watcher: PlentiWatcher = {
        plentiItemName: item.name,
        quantity,
        latitude: lastKnownPosition.coords.latitude,
        longitude: lastKnownPosition.coords.longitude,
        accountUid: loggedInAccount.uid,
        maxDistanceInKM: loggedInAccount.maxDistanceInKM,
      }
      const itemWedge: { [key: string]: string } = {}
      itemWedge[item.name] = item.name
      return Promise.all([
        database().ref(URLS.watcherForAccountItem(loggedInAccount, item)).set(watcher),
        database()
          .ref(`${URLS.account.secure(loggedInAccount)}/myWatchedItems`)
          .update(itemWedge),
      ])
    }
    return handleUnauthenticatedRequest("addWatcher")
  }

  const removeWatcher = (item: PlentiItem) => {
    if (loggedInAccount) {
      return Promise.all([
        database().ref(URLS.watcherForAccountItem(loggedInAccount, item)).remove(),
        database()
          .ref(`${URLS.account.secure(loggedInAccount)}/myWatchedItems/${item.name}`)
          .remove(),
      ])
    }
    return handleUnauthenticatedRequest("removeWatcher")
  }

  const notifyWatchersInRange = async (item: InventoryItem) => {
    const inventory = (
      await database()
        .ref(`/inventories/${item.accountUid}`)
        .once("value", (snapshot) => snapshot)
    ).val()

    const lat = inventory.latitude
    const lng = inventory.longitude
    const maxDegDiff = DEFAULT_MAX_KM_DIST / APPRX_KM_IN_DEG
    const path = `watchers/${item.plentiItemName}`

    const latboundWatchersSNAP = await database()
      .ref(path)
      .orderByChild("latitude")
      .startAt(lat - maxDegDiff)
      .endAt(lat + maxDegDiff)
      .once("value")
    const latboundWatchers = Array.from(StringMapFromObj<PlentiWatcher>(latboundWatchersSNAP.val()).values())

    const lngboundWatchersSNAP = await database()
      .ref(path)
      .orderByChild("longitude")
      .startAt(lng - maxDegDiff)
      .endAt(lng + maxDegDiff)
      .once("value")
    const lngboundWatchers = Array.from(StringMapFromObj<PlentiWatcher>(lngboundWatchersSNAP.val()).values())

    const dedupedAndFiltered = [
      ...latboundWatchers,
      ...lngboundWatchers.filter(
        (lngbound) => !latboundWatchers.map((latbound) => latbound.accountUid).includes(lngbound.accountUid),
      ),
    ].filter((watcher) => distanceInKMToPoint(watcher.latitude, watcher.longitude) <= watcher.maxDistanceInKM)

    console.log("watchers to notify", dedupedAndFiltered)
  }

  const value = { myWatchedItems, addWatcher, removeWatcher, notifyWatchersInRange }

  return <WatcherContext.Provider value={value}>{props.children}</WatcherContext.Provider>
}
