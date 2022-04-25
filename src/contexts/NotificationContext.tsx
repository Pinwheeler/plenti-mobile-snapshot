import database from "@react-native-firebase/database"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { HardwareNotification } from "../api/models/HardwareNotification"
import { StringMapFromObj, URLS } from "../lib/DatabaseHelpers"
import { AuthContext } from "./AuthContext"
import { DeviceContext } from "./DeviceContext"
import { PremiumContext } from "./PremiumContext"

interface INotificationContext {
  nextUnreadHN?: HardwareNotification
  shouldShowNextNotification: boolean
  acknowledgeHN(arg: HardwareNotification): Promise<void>
  hasSlugBeenAck(slug: string): boolean
  addNotificationBlockFlag(flag: string): void
  clearNotificationBlockFlag(flag: string): void
}

export const NotificationContext = React.createContext({} as INotificationContext)

export const NotificationProvider: React.FC = (props) => {
  const { deviceIdentifier } = useContext(DeviceContext)
  const { user } = useContext(AuthContext)
  const { hasPremium } = useContext(PremiumContext)
  const [notifications, setNotifications] = useState(new Map<string, HardwareNotification>())
  const [acknowledgedSlugs, setAcknowledgedSlugs] = useState<string[]>([])
  const [notificationBlocks, setNotificationBlocks] = useState<string[]>([])

  useEffect(() => {
    database()
      .ref("/notifications")
      .once("value", (snapshot) => setNotifications(StringMapFromObj(snapshot.val())))
  }, [])

  useEffect(() => {
    if (user) {
      user.getIdToken().then(() => {
        database()
          .ref(URLS.acknowledgedNotifications(deviceIdentifier))
          .once("value", (snapshot) => setAcknowledgedSlugs(Array.from(StringMapFromObj(snapshot.val()).keys())))
      })
    }
  }, [user])

  const addNotificationBlockFlag = (flag: string) => setNotificationBlocks((old) => [...old, flag])
  const clearNotificationBlockFlag = (flag: string) => setNotificationBlocks((old) => old.filter((f) => f !== flag))

  const acknowledgeHN = (arg: HardwareNotification) => {
    if (arg.systemPopup) {
      addNotificationBlockFlag(arg.slug)
    }
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
      if (hasPremium) {
        return unacknowledgedHNs[0]
      }
      return unacknowledgedHNs.find((val) => !val.premiumOnly)
    }
    return undefined
  }, [unacknowledgedHNs, hasPremium])

  const value = {
    nextUnreadHN,
    shouldShowNextNotification: notificationBlocks.length === 0 && !!nextUnreadHN,
    acknowledgeHN,
    hasSlugBeenAck,
    addNotificationBlockFlag,
    clearNotificationBlockFlag,
  }

  return <NotificationContext.Provider value={value}>{props.children}</NotificationContext.Provider>
}
