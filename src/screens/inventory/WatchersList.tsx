import React, { useContext } from "react"
import { WatcherContext } from "../../contexts/WatcherContext"

export const WatchersList: React.FC = () => {
  const { myWatchedItems } = useContext(WatcherContext)
}
