import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { HardwareNotification } from "../api/models/HardwareNotification"
import { StringMapFromObj, URLS } from "../lib/DatabaseHelpers"
import { AuthContext } from "./AuthContext"
import { DeviceContext } from "./DeviceContext"

interface INotificationContext {
  acknowledgeHN(arg: HardwareNotification): Promise<void>
  nextUnreadHN?: HardwareNotification
  hasSlugBeenAck(slug: string): boolean
}

export const NotificationContext = React.createContext({} as INotificationContext)

export const NotificationProvider: React.FC = (props) => {
  const { deviceIdentifier } = useContext(DeviceContext)
  const { user } = useContext(AuthContext)
  const [notifications, setNotifications] = useState(new Map<string, HardwareNotification>())
  const [acknowledgedSlugs, setAcknowledgedSlugs] = useState<string[]>([])

  useEffect(() => {
    database()
      .ref("/notifications")
      .once("value", (snapshot) => setNotifications(StringMapFromObj(snapshot.val())))
  }, [])

  useEffect(() => {
    if (user) {
      database()
        .ref(URLS.acknowledgedNotifications(deviceIdentifier))
        .once("value", (snapshot) => setAcknowledgedSlugs(Array.from(StringMapFromObj(snapshot.val()).keys())))
    }
  }, [user])

  const acknowledgeHN = (arg: HardwareNotification) => {
    const update: { [key: string]: HardwareNotification } = {}
    update[arg.slug] = arg
    return database()
      .ref(URLS.acknowledgedNotifications(deviceIdentifier))
      .update(update)
      .then(() => {
        setAcknowledgedSlugs((oldVal) => {
          const newVal = [...oldVal]
          newVal.push(arg.slug)
          return newVal
        })
      })
  }

  const hasSlugBeenAck = (slug: string): boolean => !!acknowledgedSlugs.find((val) => slug === val)

  const unacknowledgedHNs = useMemo(
    () =>
      Array.from(notifications.entries())
        .filter(([key, _val]) => !acknowledgedSlugs.includes(key))
        .map(([_key, val]) => val),
    [notifications, acknowledgedSlugs],
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
