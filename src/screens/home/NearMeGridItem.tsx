import { Text } from "@rneui/themed"
import React, { useContext, useEffect, useState } from "react"
import { View } from "react-native"

import { DistancedInventoryItem } from "../../api/views/DistancedInventoryItem.view"
import { itemForName } from "../../assets/PlentiItemsIndex"
import { ProduceGridItem } from "../../components/produce_grid/ProduceGridItem"
import { StalenessIcon } from "../../components/produce_grid/StalenessIcon"
import { AccountContext } from "../../contexts/AccountContext"
import { LocationContext } from "../../contexts/LocationContext"
import { fromISOTime } from "../../lib/DateHelper"
import { Logger } from "../../lib/Logger"
import Theme from "../../lib/Theme"
import { NearMeContext } from "./NearMeContext"

interface Props {
  item: DistancedInventoryItem
}

export const NearMeGridItem: React.FC<Props> = (props) => {
  const { setSelectedItem } = useContext(NearMeContext)
  const { loggedInAccount } = useContext(AccountContext)
  const metric = loggedInAccount ? loggedInAccount.prefersMetric : true
  const { distanceInKMToPoint, distanceInMiToPoint, lastKnownPosition, convertMiToKM } = useContext(LocationContext)
  const { item } = props
  const plentiItem = itemForName(item.inventoryItem.plentiItemName)
  const itemLat = item.referenceLat
  const itemLng = item.referenceLng
  const [distance, setDistance] = useState(metric ? convertMiToKM(item.distance) : item.distance)
  const displayDistance = `${distance.toFixed(1)} ${metric ? "km" : "mi"}`

  useEffect(() => {
    if (lastKnownPosition) {
      if (metric) {
        setDistance(distanceInKMToPoint(itemLat, itemLng))
      } else {
        setDistance(distanceInMiToPoint(itemLat, itemLng))
      }
    }
  }, [lastKnownPosition, loggedInAccount])

  if (!plentiItem) {
    Logger.error(`failed to derive plenti item from name: ${item.inventoryItem.plentiItemName}`)
    return null
  }

  return (
    <ProduceGridItem plentiItem={plentiItem} onPress={() => setSelectedItem(item)}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: Theme.colors.secondaryText }}>{displayDistance}</Text>
        <Text style={{ marginLeft: "auto" }}>
          <StalenessIcon date={fromISOTime(item.inventoryItem.updatedAt)} />
        </Text>
      </View>
    </ProduceGridItem>
  )
}
