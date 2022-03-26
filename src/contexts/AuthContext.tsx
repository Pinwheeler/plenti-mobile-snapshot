import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { LoggedInAccountEntity } from "plenti-api";
import React, { useEffect, useMemo, useState } from "react";

interface IAuthContext {
  user?: FirebaseAuthTypes.User;
  account?: LoggedInAccountEntity;
  signedInAnonymously: boolean;
  logout(): Promise<void>;
}

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [signedInAnonymously, setSignedInAnonymously] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((val) =>
      setUser(val ?? undefined)
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  const account: LoggedInAccountEntity | undefined = useMemo(() => {
    if (user) {
      return {
        id: user.uid,
        email: user.email,
        username: user.displayName,
      };
    }
    return undefined;
  }, [user]);

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
  });

  const logout = () => {
    return Promise.reject("not yet implemented");
  };

  const value = { user, signedInAnonymously, logout };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
