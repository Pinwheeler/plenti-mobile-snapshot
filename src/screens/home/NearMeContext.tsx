import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { Inventory } from "../../api/models/Inventory.model"
import { DistancedInventoryItem } from "../../api/views/DistancedInventoryItem.view"
import { AccountContext } from "../../contexts/AccountContext"
import { AuthContext } from "../../contexts/AuthContext"
import { LocationContext } from "../../contexts/LocationContext"
import { StringMapFromObj } from "../../lib/DatabaseHelpers"

const APPRX_KM_IN_DEG = 111

export interface INearMeContext {
  items: DistancedInventoryItem[]
  selectedItem?: DistancedInventoryItem
  setSelectedItem: (item?: DistancedInventoryItem) => void
}

export const NearMeContext = React.createContext({} as INearMeContext)

export const NearMeProvider: React.FC = (props) => {
  const { user } = useContext(AuthContext)
  const { loggedInAccount } = useContext(AccountContext)
  const { lastKnownPosition, distanceInKMToPoint } = useContext(LocationContext)
  const [selectedItem, setSelectedItem] = useState<DistancedInventoryItem>()
  const [inventoriesWithinLatBounds, setInventoryWithinLatBounds] = useState(new Map<string, Inventory>())
  const [inventoriesWithinLngBounds, setInventoryWithinLngBounds] = useState(new Map<string, Inventory>())

  const maxDistance = loggedInAccount?.maxDistance ?? 1000
  const maxDegDiff = maxDistance / APPRX_KM_IN_DEG

  const latRange = useMemo(() => {
    if (lastKnownPosition) {
      const latitude = lastKnownPosition.coords.latitude
      return { minLat: latitude - maxDegDiff, maxLat: latitude + maxDegDiff }
    }
  }, [loggedInAccount, lastKnownPosition])

  const lngRange = useMemo(() => {
    if (lastKnownPosition) {
      const longitude = lastKnownPosition.coords.longitude
      return { minLng: longitude - maxDegDiff, maxLng: longitude + maxDegDiff }
    }
  }, [loggedInAccount, lastKnownPosition])

  useEffect(() => {
    if (lastKnownPosition && latRange && user) {
      const onLatBoundChange = database()
        .ref("/inventories")
        .orderByChild("latitude")
        // .startAt(latRange.minLat)
        // .endAt(latRange.maxLat)
        .on("value", (snapshot) => setInventoryWithinLatBounds(StringMapFromObj(snapshot.val())))

      return () => database().ref("/inventories").off("value", onLatBoundChange)
    }
  }, [lastKnownPosition, user])

  useEffect(() => {
    if (lastKnownPosition && lngRange && user) {
      const onLngBoundChange = database()
        .ref("/inventories")
        .orderByChild("longitude")
        // .startAt(lngRange.minLng)
        // .endAt(lngRange.maxLng)
        .on("value", (snapshot) => setInventoryWithinLngBounds(StringMapFromObj(snapshot.val())))

      return () => database().ref("/inventories").off("value", onLngBoundChange)
    }
  }, [lastKnownPosition, user])

  const inventoriesWithinBounds = useMemo(() => {
    if (inventoriesWithinLatBounds && inventoriesWithinLngBounds) {
      const keys = Array.from(inventoriesWithinLatBounds.keys())
      const temp = Array.from(inventoriesWithinLatBounds.values()).filter(
        (value) => value.accountUid !== loggedInAccount?.uid,
      )
      inventoriesWithinLngBounds.forEach((val, key) => {
        if (key !== loggedInAccount?.uid && !keys.includes(key)) {
          temp.push(val)
        }
      })
      return temp
    }
    return []
  }, [inventoriesWithinLatBounds, inventoriesWithinLngBounds])

  const items = useMemo(() => {
    const val: DistancedInventoryItem[] = []
    inventoriesWithinBounds.forEach((inv) => {
      const distanceToInventory = distanceInKMToPoint(inv.latitude, inv.longitude)
      const map = StringMapFromObj(inv.items)
      Array.from(map.values()).forEach((item) => {
        const distanced: DistancedInventoryItem = {
          owningAccountUsername: inv.accountUsername,
          inventoryItem: item,
          distance: distanceToInventory,
          referenceLat: inv.latitude,
          referenceLng: inv.longitude,
        }
        val.push(distanced)
      })
    })
    return val
  }, [inventoriesWithinBounds])

  const value: INearMeContext = {
    items,
    selectedItem,
    setSelectedItem,
  }

  return <NearMeContext.Provider value={value}>{props.children}</NearMeContext.Provider>
}
