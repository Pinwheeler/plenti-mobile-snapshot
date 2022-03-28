import crashlytics from "@react-native-firebase/crashlytics";
import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useContext } from "react";
import { AccountEntity } from "../api/models/Account";
import {
  isLoggedInAccount,
  LoggedInAccountEntity,
} from "../api/models/LoggedInAccount";
import { AccountContext } from "./AccountContext";

interface IImageContext {
  imageUriForAccount(Account: AccountEntity): Promise<string>;
  uploadNewProfilePicture(
    image: ImagePicker.ImageInfo,
    account: LoggedInAccountEntity
  ): Promise<any>;
}

export const ImageContext = React.createContext({} as IImageContext);

export const ImageProvider: React.FC = (props) => {
  const { profilePicture, refreshProfilePicture } = useContext(AccountContext);

  const imageUriForAccount = useCallback(
    (account: AccountEntity) => {
      if (isLoggedInAccount(account) && profilePicture) {
        return Promise.resolve(profilePicture);
      }
      return storage().ref(account.profilePictureUrl).getDownloadURL();
    },
    [profilePicture]
  );

  const uploadNewProfilePicture = (
    image: ImagePicker.ImageInfo,
    account: LoggedInAccountEntity
  ) =>
    storage()
      .ref(account.profilePictureUrl)
      .putFile(image.uri)
      .catch((error) => {
        crashlytics().recordError(error);
        console.warn(error);
      })
      .finally(() => refreshProfilePicture());

  const value = { imageUriForAccount, uploadNewProfilePicture };

  return (
    <ImageContext.Provider value={value}>
      {props.children}
    </ImageContext.Provider>
  );
};
