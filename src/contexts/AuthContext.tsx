import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { AccountLoginForm, AccountSignupForm } from "../api/forms";
import { LoadingScreen } from "../screens/LoadingScreen";
import { AccountContext } from "./AccountContext";
interface IAuthContext {
  user?: FirebaseAuthTypes.User;
  signedInAnonymously: boolean;
  logout(): Promise<void>;
  login(value: AccountLoginForm): Promise<FirebaseAuthTypes.UserCredential>;
  signup(value: AccountSignupForm): Promise<void | FirebaseAuthTypes.User>;
}

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthProvider: React.FC = (props) => {
  const { authenticateUser, createAccount } = useContext(AccountContext);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [initializing, setInitializing] = useState(false);
  const [signedInAnonymously, setSignedInAnonymously] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((u) => {
      if (u) {
        authenticateUser(u);
        setUser(u);
        setInitializing(false);
      } else {
        auth()
          .signInAnonymously()
          .then(() => {
            setSignedInAnonymously(true);
            setInitializing(false);
            console.log("User signed in anonymously");
          })
          .catch((error) => {
            if (error.code === "auth/operation-not-allowed") {
              console.log("Enable anonymous in your firebase console.");
            }

            console.error(error);
          });
      }
    });
    return unsubscribe;
  });

  const logout = () => auth().signOut();

  const login = (value: AccountLoginForm) =>
    auth().signInWithEmailAndPassword(value.email, value.password);

  const signup = (
    form: AccountSignupForm
  ): Promise<void | FirebaseAuthTypes.User> =>
    auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(({ user: u }) => {
        createAccount(u, form);
        return u;
      });

  const value = { user, signedInAnonymously, logout, login, signup };

  if (initializing) {
    return <LoadingScreen loading />;
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
