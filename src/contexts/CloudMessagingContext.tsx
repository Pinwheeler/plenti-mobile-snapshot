import messaging from "@react-native-firebase/messaging"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { Alert } from "react-native"
import { AccountEntity } from "../api/models/Account"
import { NotificationContext } from "./NotificationContext"

interface ICloudMessagingContext {
  sendMessageToUser(message: string, user: AccountEntity): Promise<any>
}

export const CloudMessagingContext = React.createContext({} as ICloudMessagingContext)

export const CLOUD_MESSAGING_SLUG = "PUSH_NOTIFICATIONS"

export const CloudMessagingProvider: React.FC = (props) => {
  const { hasSlugBeenAck, clearNotificationBlockFlag } = useContext(NotificationContext)
  const [cloudMessagingEnabled, setCloudMessagingEnabled] = useState(false)

  const acceptedMessagingCheck = useMemo(() => {
    return hasSlugBeenAck(CLOUD_MESSAGING_SLUG)
  }, [hasSlugBeenAck])

  useEffect(() => {
    ;(async () => {
      if (acceptedMessagingCheck) {
        const authStatus = await messaging().requestPermission()
        clearNotificationBlockFlag(CLOUD_MESSAGING_SLUG)
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
        setCloudMessagingEnabled(enabled)
      }
    })()
  }, [acceptedMessagingCheck])

  useEffect(() => {
    if (cloudMessagingEnabled) {
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        Alert.alert("A new FCM message has arrived!", JSON.stringify(remoteMessage))
      })

      return unsubscribe
    }
  }, [cloudMessagingEnabled])

  const value = {}

  return <CloudMessagingContext.Provider value={value}>{props.children}</CloudMessagingContext.Provider>
}
