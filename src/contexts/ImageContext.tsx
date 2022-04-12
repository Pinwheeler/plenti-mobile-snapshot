import storage from "@react-native-firebase/storage"
import React, { useCallback, useContext } from "react"
import ImageResizer from "react-native-image-resizer"
import { AccountEntity } from "../api/models/Account"
import { isLoggedInAccount, LoggedInAccountEntity } from "../api/models/LoggedInAccount"
import { PlentiItem } from "../assets/PlentiItemsIndex"
import { URLS } from "../lib/DatabaseHelpers"
import { Logger } from "../lib/Logger"
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
      return storage().ref(URLS.images.profile(account)).getDownloadURL()
    },
    [profilePicture],
  )

  const resizeImage = (imageUri: string, size = 200) =>
    ImageResizer.createResizedImage(imageUri, size, size, "PNG", 100, undefined, undefined, false, { mode: "cover" })

  const uploadNewProfilePicture = (imageUri: string, account: LoggedInAccountEntity) =>
    resizeImage(imageUri).then((resized) =>
      storage()
        .ref(URLS.images.profile(account))
        .putFile(resized.uri)
        .catch((error) => {
          Logger.error(error)
        })
        .finally(() => refreshProfilePicture()),
    )

  const uploadNewProduceImage = (imageUri: string, plentiItem: PlentiItem, account: LoggedInAccountEntity) =>
    resizeImage(imageUri, 400).then((resized) => {
      storage()
        .ref(URLS.images.produceItem(account, plentiItem))
        .putFile(resized.uri)
        .catch((error) => Logger.error(error))
    })

  const value = { imageUriForAccount, uploadNewProfilePicture, uploadNewProduceImage }

  return <ImageContext.Provider value={value}>{props.children}</ImageContext.Provider>
}
