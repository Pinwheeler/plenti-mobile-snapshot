import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { AccountEntity } from "../api/models/Account"
import { HardwareNotification } from "../api/models/HardwareNotification"
import { InventoryItem } from "../api/models/InventoryItem"
import { LoggedInAccountEntity } from "../api/models/LoggedInAccount"
import { PlentiItem } from "../assets/PlentiItemsIndex"
import { Logger } from "./Logger"

export const URLS = {
  inventory: (account: AccountEntity) => logPath(`/inventories/${account.uid}`),
  watchers: (account: AccountEntity) => logPath(`/watchers/${account.uid}`),

  inventoryItem: (item: InventoryItem) => logPath(`/inventories/${item.accountUid}/${item.plentiItemName}`),

  reportsTargetingUser: (account: AccountEntity) => logPath(`/reports/${account.uid}`),

  connectionsForAccount: (account: AccountEntity) => logPath(`/connections/${account.uid}`),

  watchersForItem: (account: LoggedInAccountEntity, item: PlentiItem) =>
    logPath(`/watchers/${account.uid}/${item.name}`),

  notification: (notification: HardwareNotification) => logPath(`/notifications/${notification.slug}`),

  images: {
    profile: (account: AccountEntity) => logPath(`users/${account.uid}/profile-picture.png`),
    produceItem: (account: AccountEntity, plentiItem: PlentiItem) =>
      logPath(`users/${account.uid}/produce-images/${plentiItem.name}.png`),
  },

  acknowledgedNotifications: (deviceId: string) => logPath(`/devices/${deviceId}/acknowledgedNotifications`),

  account: {
    public: (account: FirebaseAuthTypes.User | AccountEntity) => logPath(`/accounts/${account.uid}`),
    secure: (account: FirebaseAuthTypes.User | AccountEntity) => logPath(`/secure/${account.uid}/account`),
  },
}

const logPath = (path: string) => {
  if (__DEV__) {
    console.log(path)
  }
  return path
}

export const handleUnauthenticatedRequest = (requestDescription: string) => {
  const reason = `Calling [${requestDescription}] without being logged in. Something is Fishy`
  Logger.error(reason)
  return Promise.reject(reason)
}

export function StringMapFromObj<V>(object: { [key: string]: V }) {
  const map = new Map<string, V>()
  for (let member in object) {
    map.set(member, object[member])
  }
  return map
}
