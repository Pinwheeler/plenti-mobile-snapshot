import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import React, { useEffect, useState } from "react";
import { AccountSignupForm } from "../api/forms";
import { AccountEntity, LoggedInAccountEntity } from "../api/models";

interface IDataContext {
  loggedInAccount?: LoggedInAccountEntity;
  accountForUser(user: FirebaseAuthTypes.User): Promise<AccountEntity>;
  authenticateUser(user: FirebaseAuthTypes.User): void;
  createAccount(user: FirebaseAuthTypes.User, form: AccountSignupForm): void;
}

export const DataContext = React.createContext({} as IDataContext);

export const DataProvider: React.FC = (props) => {
  const [loggedInAccount, setLoggedInAccount] =
    useState<LoggedInAccountEntity>();
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [userToken, setUserToken] = useState<string>();

  const accountForUser = (user: FirebaseAuthTypes.User) =>
    database()
      .ref(`/accounts/${user.uid}`)
      .once("value")
      .then((snapshot) => new AccountEntity(snapshot.val()));

  const createAccount = (
    user: FirebaseAuthTypes.User,
    form: AccountSignupForm
  ) => {
    user.getIdToken().then((token) => {
      setUserToken(token);
      const account = new AccountEntity({
        id: 0,
        username: form.username,
      });
      const loggedInAccount = new LoggedInAccountEntity({
        id: 0,
        email: form.email,
        username: form.username,
        authToken: token,
        prefersMetric: true,
        maxDistance: -1,
        iapId: "NOT_YET_IMPLEMENTED",
      });
      database().ref(`/accounts/${user.uid}`).set(account);
      database().ref(`/secure/${user.uid}/account`).set(loggedInAccount);
    });
  };

  useEffect(() => {
    if (!user || !userToken) {
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
  }, [user, userToken]);

  const value = {
    loggedInAccount,
    accountForUser,
    authenticateUser: setUser,
    createAccount,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
