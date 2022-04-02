import storage from "@react-native-firebase/storage"
import React, { useCallback, useContext } from "react"
import { AccountEntity } from "../api/models/Account"
import { isLoggedInAccount, LoggedInAccountEntity } from "../api/models/LoggedInAccount"
import { PlentiItem } from "../assets/PlentiItemsIndex"
import { Logger } from "../lib/Logger"
import { URLS } from "../lib/DatabaseHelpers"
import { AccountContext } from "./AccountContext"

interface IImageContext {
  imageUriForAccount(Account: AccountEntity): Promise<string>
  uploadNewProfilePicture(imageUri: string, account: LoggedInAccountEntity): Promise<any>
  uploadNewProduceImage(imageUri: string, plentiItem: PlentiItem, account: LoggedInAccountEntity): Promise<any>
}

export const ImageContext = React.createContext({} as IImageContext)

export const ImageProvider: React.FC = (props) => {
  const { profilePicture, refreshProfilePicture } = useContext(AccountContext)

  const imageUriForAccount = useCallback(
    (account: AccountEntity) => {
      if (isLoggedInAccount(account) && profilePicture) {
        return Promise.resolve(profilePicture)
      }
      return storage().ref(URLS.images.profilePicture(account)).getDownloadURL()
    },
    [profilePicture],
  )

  const uploadNewProfilePicture = (imageUri: string, account: LoggedInAccountEntity) =>
    storage()
      .ref(URLS.images.profilePicture(account))
      .putFile(imageUri)
      .catch((error) => {
        Logger.error(error)
      })
      .finally(() => refreshProfilePicture())

  const uploadNewProduceImage = (imageUri: string, plentiItem: PlentiItem, account: LoggedInAccountEntity) =>
    storage()
      .ref(URLS.images.produceItem(account, plentiItem))
      .putFile(imageUri)
      .catch((error) => Logger.error(error))

  const value = { imageUriForAccount, uploadNewProfilePicture, uploadNewProduceImage }

  return <ImageContext.Provider value={value}>{props.children}</ImageContext.Provider>
}
