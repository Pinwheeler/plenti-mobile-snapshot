import crashlytics from "@react-native-firebase/crashlytics";
import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { LoggedInAccountEntity } from "../api/models";
import { AccountEntity } from "../api/models/Account";

interface IImageContext {
  imageUriForAccount(Account: AccountEntity): Promise<string>;
  uploadNewProfilePicture(
    image: ImagePicker.ImageInfo,
    account: LoggedInAccountEntity
  ): void;
}

export const ImageContext = React.createContext({} as IImageContext);

export const ImageProvider: React.FC = (props) => {
  const imageUriForAccount = (account: AccountEntity) =>
    storage().ref(`users/${account.id}/profile-picture.png`).getDownloadURL();

  const uploadNewProfilePicture = (
    image: ImagePicker.ImageInfo,
    account: LoggedInAccountEntity
  ) =>
    storage()
      .ref(`users/${account.id}/profile-picture.png`)
      .putFile(image.uri)
      .catch((error) => {
        crashlytics().recordError(error);
        console.warn(error);
      });

  const value = { imageUriForAccount, uploadNewProfilePicture };

  return (
    <ImageContext.Provider value={value}>
      {props.children}
    </ImageContext.Provider>
  );
};
