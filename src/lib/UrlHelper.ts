import { AccountEntity } from "../api/models/Account"
import { PlentiItem } from "../assets/PlentiItemsIndex"

export const URLS = {
  images: {
    profilePicture: (account: AccountEntity) => `users/${account.id}/profile-picture.png`,

    produceItem: (account: AccountEntity, plentiItem: PlentiItem) =>
      `users/${account.id}/produce-images/${plentiItem.name}.png`,
  },
}
