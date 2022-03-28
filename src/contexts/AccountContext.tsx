import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import React, { useEffect, useState } from "react";
import { AccountSignupForm, AccountUpdateForm } from "../api/forms";
import { AccountEntity, LoggedInAccountEntity } from "../api/models";

interface IAccountContext {
  loggedInAccount?: LoggedInAccountEntity;
  accountForUser(user: FirebaseAuthTypes.User): Promise<AccountEntity>;
  authenticateUser(user: FirebaseAuthTypes.User): void;
  createAccount(user: FirebaseAuthTypes.User, form: AccountSignupForm): void;
  updateAccount(form: AccountUpdateForm): Promise<void>;
}

export const AccountContext = React.createContext({} as IAccountContext);

export const AccountProvider: React.FC = (props) => {
  const [loggedInAccount, setLoggedInAccount] =
    useState<LoggedInAccountEntity>();
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

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

  const updateAccount = (form: AccountUpdateForm) => {
    if (loggedInAccount) {
      return database().ref(`/accounts/${loggedInAccount.id}`).update({ form });
    }

    return Promise.reject(
      "calling update account without being logged in. Something is fishy"
    );
  };

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
    authenticateUser: setUser,
    createAccount,
    updateAccount,
  };

  return (
    <AccountContext.Provider value={value}>
      {props.children}
    </AccountContext.Provider>
  );
};