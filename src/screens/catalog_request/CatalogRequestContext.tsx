import React, { useContext } from "react"
import { CreateCatalogRequestForm } from "../../api/forms/CatalogRequestForm"
import database from "@react-native-firebase/database"
import { AccountContext } from "../../contexts/AccountContext"

interface ICatalogRequestContext {
  submitCatalogRequest: (form: CreateCatalogRequestForm) => Promise<void>
}

export const CatalogRequestContext = React.createContext<ICatalogRequestContext>({} as ICatalogRequestContext)

export const CatalogRequestProvider: React.FC = (props) => {
  const { loggedInAccount } = useContext(AccountContext)

  const submitCatalogRequest = (form: CreateCatalogRequestForm) =>
    database()
      .ref(`/catalogRequests/${form.itemName}`)
      .set({ description: form.itemDescription, email: loggedInAccount?.email ?? "Anonymous" })

  const value = {
    submitCatalogRequest,
  }

  return <CatalogRequestContext.Provider value={value}>{props.children}</CatalogRequestContext.Provider>
}
