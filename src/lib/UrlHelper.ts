import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { AccountEntity } from "../api/models/Account"
import { InventoryItem, InventoryItemModel } from "../api/models/InventoryItem"
import { LoggedInAccountEntity } from "../api/models/LoggedInAccount"
import { PlentiItem } from "../assets/PlentiItemsIndex"

export const URLS = {
  images: {
    profilePicture: (account: AccountEntity) => logPath(`users/${account.uid}/profile-picture.png`),
    produceItem: (account: AccountEntity, plentiItem: PlentiItem) =>
      logPath(`users/${account.uid}/produce-images/${plentiItem.name}.png`),
  },

  inventory: (account: AccountEntity) => `/inventories/${account.uid}`,
  inventoryItem: (item: InventoryItem | InventoryItemModel) =>
    logPath(`/inventories/${item.accountUid}/${item.plentiItemName}`),
  reportsTargetingUser: (account: AccountEntity) => `/reports/${account.uid}`,
  connectionsForUser: (account: LoggedInAccountEntity) => `/connections/${account.uid}`,

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
