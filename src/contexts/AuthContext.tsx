import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";

interface IAuthContext {
  user?: FirebaseAuthTypes.User;
  signedInAnonymously: boolean;
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

  const value = { user, signedInAnonymously };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
