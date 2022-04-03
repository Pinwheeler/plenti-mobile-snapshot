import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { HardwareNotification } from "../api/models/HardwareNotification"
import { URLS } from "../lib/DatabaseHelpers"
import { DeviceContext } from "./DeviceContext"

interface INotificationContext {
  acknowledgeHN(arg: HardwareNotification): Promise<void>
  nextUnreadHN?: HardwareNotification
  hasSlugBeenAck(slug: string): boolean
}

export const NotificationContext = React.createContext({} as INotificationContext)

export const NotificationProvider: React.FC = (props) => {
  const { deviceIdentifier } = useContext(DeviceContext)
  const [notifications, setNotifications] = useState(new Map<string, HardwareNotification>())
  const [acknowledgedUids, setAcknowledgedUids] = useState<string[]>([])

  useEffect(() => {
    const onNotificationsChange = database()
      .ref("/notifications")
      .on("value", (snapshot) => setNotifications(new Map<string, HardwareNotification>(snapshot.val())))
    return () => database().ref("/notifications").off("value", onNotificationsChange)
  }, [])

  useEffect(() => {
    const onAckedNotificationsChange = database()
      .ref(URLS.acknowledgedNotifications(deviceIdentifier))
      .on("value", (snapshot) =>
        setAcknowledgedUids(Array.from(new Map<string, HardwareNotification>(snapshot.val()).keys())),
      )
    return () =>
      database().ref(URLS.acknowledgedNotifications(deviceIdentifier)).off("value", onAckedNotificationsChange)
  }, [])

  const acknowledgeHN = (arg: HardwareNotification) => {
    const update: { [key: string]: HardwareNotification } = {}
    update[arg.slug] = arg
    return database().ref(URLS.acknowledgedNotifications(deviceIdentifier)).update(update)
  }

  const hasSlugBeenAck = (slug: string): boolean => !!acknowledgedUids.find((val) => slug === val)

  const unacknowledgedHNs = useMemo(
    () =>
      Array.from(notifications.entries())
        .filter(([key, _val]) => !!acknowledgedUids.find((ack) => key === ack))
        .map(([_key, val]) => val),
    [notifications, acknowledgedUids],
  )

  const nextUnreadHN = useMemo(() => {
    if (unacknowledgedHNs.length > 0) {
      return unacknowledgedHNs[0]
    }
    return undefined
  }, [unacknowledgedHNs])

  const value = { acknowledgeHN, nextUnreadHN, hasSlugBeenAck }

  return <NotificationContext.Provider value={value}>{props.children}</NotificationContext.Provider>
}
