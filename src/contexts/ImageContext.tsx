import { AccountEntity } from "plenti-api";
import React from "react";

interface IImageContext {
  imageUriForAccount(method: string, Account: AccountEntity): Promise<string>;
}

export const ImageContext = React.createContext({} as IImageContext);

export const ImageProvider: React.FC = (props) => {
  const imageUriForAccount = (method: string, Account: AccountEntity) =>
    Promise.reject("not yet implemented");

  const value = { imageUriForAccount };

  return (
    <ImageContext.Provider value={value}>
      {props.children}
    </ImageContext.Provider>
  );
};
