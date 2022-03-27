import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { AccountLoginForm, AccountSignupForm } from "../api/forms";
import { DataContext } from "./DataContext";

const CLIENT_SECRET = "231b0e38-ad3a-11ec-b909-0242ac120002";
interface IAuthContext {
  user?: FirebaseAuthTypes.User;
  signedInAnonymously: boolean;
  logout(): Promise<void>;
  login(value: AccountLoginForm): Promise<FirebaseAuthTypes.User>;
  signup(value: AccountSignupForm): Promise<void | FirebaseAuthTypes.User>;
}

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthProvider: React.FC = (props) => {
  const { authenticateUser, createAccount } = useContext(DataContext);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [signedInAnonymously, setSignedInAnonymously] = useState(false);

  useEffect(() => {
    auth()
      .signInAnonymously()
      .then(() => {
        setSignedInAnonymously(true);
        console.log("User signed in anonymously");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
      });
  }, []);

  const logout = () => {
    return Promise.reject("not yet implemented");
  };

  const login = (value: AccountLoginForm) =>
    auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then(({ user: u }) => {
        authenticateUser(u);
        setUser(u);
        return u;
      });

  const signup = (
    form: AccountSignupForm
  ): Promise<void | FirebaseAuthTypes.User> =>
    auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(({ user: u }) => {
        authenticateUser(u);
        setUser(u);
        createAccount(u, form);
        return u;
      });

  const value = { user, signedInAnonymously, logout, login, signup };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
