import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { AccountEntity, LoggedInAccountEntity } from "plenti-api";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

interface IDataContext {
  loggedInAccount?: LoggedInAccountEntity;
  accountForUser(user: FirebaseAuthTypes.User): Promise<AccountEntity>;
}

export const DataContext = React.createContext({} as IDataContext);

export const DataProvider: React.FC = (props) => {
  const { user } = useContext(AuthContext);
  const [loggedInAccount, setLoggedInAccount] =
    useState<LoggedInAccountEntity>();

  const accountForUser = (user: FirebaseAuthTypes.User) =>
    database()
      .ref(`/accounts/${user.uid}`)
      .once("value")
      .then((snapshot) => new AccountEntity(snapshot.val()));

  useEffect(() => {
    if (!user) {
      return undefined;
    }
    const path = `/secure/${user.uid}/account`;
    const onUserChange = database()
      .ref(path)
      .on("value", (snapshot) => {
        console.log("User data: ", snapshot.val());
        setLoggedInAccount(new LoggedInAccountEntity(snapshot.val()));
      });

    return () => database().ref(path).off("value", onUserChange);
  }, [user]);

  const value = {
    loggedInAccount,
    accountForUser,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
