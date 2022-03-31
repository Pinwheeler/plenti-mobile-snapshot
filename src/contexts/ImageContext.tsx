import crashlytics from "@react-native-firebase/crashlytics"
import storage from "@react-native-firebase/storage"
import * as ImagePicker from "expo-image-picker"
import React, { useCallback, useContext } from "react"
import { AccountEntity } from "../api/models/Account"
import { isLoggedInAccount, LoggedInAccountEntity } from "../api/models/LoggedInAccount"
import { PlentiItem } from "../assets/PlentiItemsIndex"
import { URLS } from "../lib/UrlHelper"
import { AccountContext } from "./AccountContext"

interface IImageContext {
  imageUriForAccount(Account: AccountEntity): Promise<string>
  uploadNewProfilePicture(image: ImagePicker.ImageInfo, account: LoggedInAccountEntity): Promise<any>
  uploadNewProduceImage(
    image: ImagePicker.ImageInfo,
    plentiItem: PlentiItem,
    account: LoggedInAccountEntity,
  ): Promise<any>
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

  const uploadNewProfilePicture = (image: ImagePicker.ImageInfo, account: LoggedInAccountEntity) =>
    storage()
      .ref(URLS.images.profilePicture(account))
      .putFile(image.uri)
      .catch((error) => {
        crashlytics().recordError(error)
        console.warn(error)
      })
      .finally(() => refreshProfilePicture())

  const uploadNewProduceImage = (
    image: ImagePicker.ImageInfo,
    plentiItem: PlentiItem,
    account: LoggedInAccountEntity,
  ) =>
    storage()
      .ref(URLS.images.produceItem(account, plentiItem))
      .putFile(image.uri)
      .catch((error) => {
        crashlytics().recordError(error)
        console.warn(error)
      })

  const value = { imageUriForAccount, uploadNewProfilePicture, uploadNewProduceImage }

  return <ImageContext.Provider value={value}>{props.children}</ImageContext.Provider>
}
