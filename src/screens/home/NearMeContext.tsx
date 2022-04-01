import { DistancedInventoryItemEntity, Page } from "plenti-api"
import React, { useContext, useEffect, useState } from "react"
import AccountContext from "src/account/AccountContext"
import { LoggerService } from "src/lib/LoggerService"
import ApiContext from "src/shared/ApiContext"
import LocationContext from "src/shared/LocationContext"

export interface INearMeContext {
  items: DistancedInventoryItemEntity[]
  requestPage: (pageNumber: number) => void
  refresh: () => Promise<void>
  selectedItem?: DistancedInventoryItemEntity
  setSelectedItem: (item?: DistancedInventoryItemEntity) => void
}

export const NearMeContext = React.createContext({} as INearMeContext)

export const NearMeProvider: React.FC = (props) => {
  const { inventoryService } = useContext(ApiContext)
  const { account } = useContext(AccountContext)
  const { lastKnownPosition, getCurrentPosition } = useContext(LocationContext)
  const [items, setItems] = useState<DistancedInventoryItemEntity[]>([])
  const [selectedItem, setSelectedItem] = useState<DistancedInventoryItemEntity>()

  const refresh = async () => {
    await getCurrentPosition() // force a refresh of the current position
  }

  useEffect(() => {
    setItems([])
    requestPage(0)
  }, [lastKnownPosition])

  const requestPage = async (pageNumber: number) => {
    inventoryService
      .nearPoint(lastKnownPosition.coords.latitude, lastKnownPosition.coords.longitude, {
        page: pageNumber,
      })
      .then((page: Page<DistancedInventoryItemEntity>) => {
        setItems(
          page.content.filter((item) => {
            if (account) {
              return item.inventoryItem.account.id !== account.id
            } else {
              return true
            }
          }),
        )
      })
      .catch((error) => LoggerService.instance().error(error, "NearMe error"))
  }

  const value: INearMeContext = {
    items,
    requestPage,
    refresh,
    selectedItem,
    setSelectedItem,
  }

  return <NearMeContext.Provider value={value}>{props.children}</NearMeContext.Provider>
}
