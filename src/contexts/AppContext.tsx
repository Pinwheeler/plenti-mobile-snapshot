import React, { useState } from "react"

interface IAppContext {
  appwideError?: Error
  setAppwideError(error?: Error): void
}

export const AppContext = React.createContext({} as IAppContext)

export const AppProvider: React.FC = (props) => {
  const [appwideError, setAppwideError] = useState<Error>()
  const value = {
    appwideError,
    setAppwideError,
  }

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}
