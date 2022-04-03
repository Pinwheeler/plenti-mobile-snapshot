import database from "@react-native-firebase/database"
import React, { useEffect, useState } from "react"
import { LoadingScreen } from "../screens/LoadingScreen"

interface Secrets {
  OPEN_CAGE_API_KEY: string
}

interface ISecretsContext {
  SECRETS: Secrets
}

export const SecretsContext = React.createContext({} as ISecretsContext)

export const SecretsProvider: React.FC = (props) => {
  const [SECRETS, setSECRETS] = useState<Secrets>()

  useEffect(() => {
    const onSecretsChange = database()
      .ref("/secure/secrets")
      .on("value", (snapshot) => {
        setSECRETS(snapshot.val())
      })

    return () => database().ref("/secure/secrets").off("value", onSecretsChange)
  })

  if (!SECRETS) {
    return <LoadingScreen loadingMessage="Loading App Configuration..." loading={true} />
  }

  const value = { SECRETS }
  return <SecretsContext.Provider value={value}>{props.children}</SecretsContext.Provider>
}
