import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { AccountEntity } from "../api/models/Account"
import { InventoryItem, InventoryItemModel } from "../api/models/InventoryItem"
import { PlentiItem } from "../assets/PlentiItemsIndex"

export const URLS = {
  images: {
    profilePicture: (account: AccountEntity) => `users/${account.uid}/profile-picture.png`,

    produceItem: (account: AccountEntity, plentiItem: PlentiItem) =>
      `users/${account.uid}/produce-images/${plentiItem.name}.png`,
  },

  inventory: (account: AccountEntity) => `/inventories/${account.uid}`,
  inventoryItem: (item: InventoryItem | InventoryItemModel) => `/inventories/${item.accountUid}/${item.uid}`,

  account: {
    public: (account: FirebaseAuthTypes.User | AccountEntity) => `/accounts/${account.uid}`,
    secure: (account: FirebaseAuthTypes.User | AccountEntity) => `/secure/${account.uid}/account`,
  },
}
