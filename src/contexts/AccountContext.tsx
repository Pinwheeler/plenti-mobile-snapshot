import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"
import storage from "@react-native-firebase/storage"
import React, { useEffect, useState } from "react"
import { AccountSignupForm } from "../api/forms/AccountSignupForm"
import { AccountUpdateForm } from "../api/forms/AccountUpdateForm"
import { AccountEntity } from "../api/models/Account"
import { LoggedInAccountEntity, LoggedInAccountModel } from "../api/models/LoggedInAccount"
import { handleUnauthenticatedRequest, URLS } from "../lib/DatabaseHelpers"

interface IAccountContext {
  loggedInAccount?: LoggedInAccountEntity
  profilePicture?: Promise<string>
  accountForUser(user: FirebaseAuthTypes.User): Promise<AccountEntity>
  authenticateUser(user: FirebaseAuthTypes.User): void
  createAccount(user: FirebaseAuthTypes.User, form: AccountSignupForm): void
  updateAccount(form: AccountUpdateForm): Promise<[void, void]>
  refreshProfilePicture(): void
  blockUser(targetAccount: AccountEntity, reason?: string): Promise<[void, void]>
  logout(): void
}

export const AccountContext = React.createContext({} as IAccountContext)

export const AccountProvider: React.FC = (props) => {
  const [loggedInAccount, setLoggedInAccount] = useState<LoggedInAccountEntity>()
  const [user, setUser] = useState<FirebaseAuthTypes.User>()
  const [profilePicture, setProfilePicture] = useState<Promise<string>>()

  const refreshProfilePicture = () => {
    if (loggedInAccount) {
      const path = URLS.images.profile(loggedInAccount)
      console.log("fetching", path)
      setProfilePicture(storage().ref(path).getDownloadURL())
    }
  }

  const accountForUser = (user: FirebaseAuthTypes.User) =>
    database()
      .ref(URLS.account.public(user))
      .once("value")
      .then((snapshot) => new AccountEntity(snapshot.val()))

  const createAccount = (user: FirebaseAuthTypes.User, form: AccountSignupForm) => {
    user.getIdToken().then((token) => {
      const account = new AccountEntity({
        uid: user.uid,
        username: form.username,
      })
      const loggedInAccount = new LoggedInAccountEntity({
        uid: user.uid,
        email: form.email,
        username: form.username,
        authToken: token,
        prefersMetric: true,
        maxDistance: -1,
        iapId: "NOT_YET_IMPLEMENTED",
        blockedUsers: [],
      })
      database().ref(URLS.account.public(account)).set(account)
      database().ref(URLS.account.secure(loggedInAccount)).set(loggedInAccount)
    })
  }

  const updateAccount = (form: AccountUpdateForm) => {
    if (loggedInAccount) {
      return Promise.all([
        database().ref(URLS.account.public(loggedInAccount)).update(form),
        database().ref(URLS.account.secure(loggedInAccount)).update(form),
      ])
    }
    return handleUnauthenticatedRequest("updateAccount")
  }

  const blockUser = (targetUser: AccountEntity, reason?: string) => {
    if (loggedInAccount) {
      const update = { ...loggedInAccount }
      update.blockedUsers.push({ blockedUserId: targetUser.uid, reason })
      return Promise.all([
        database().ref(URLS.account.public(loggedInAccount)).update(update),
        database().ref(URLS.reportsTargetingUser(targetUser)).set({ reportingUser: loggedInAccount.uid, reason }),
      ])
    }
    return handleUnauthenticatedRequest("blockUser")
  }

  const logout = () => setUser(undefined)

  useEffect(() => {
    if (!user) {
      setLoggedInAccount(undefined)
      return
    }
    const path = URLS.account.secure(user)
    const onUserChange = database()
      .ref(path)
      .on("value", (snapshot) => {
        const model: LoggedInAccountModel | undefined = snapshot.val()
        if (model) {
          setLoggedInAccount(new LoggedInAccountEntity(model))
        }
      })

    return () => database().ref(path).off("value", onUserChange)
  }, [user])

  const value = {
    loggedInAccount,
    profilePicture,
    accountForUser,
    authenticateUser: setUser,
    createAccount,
    updateAccount,
    refreshProfilePicture,
    logout,
    blockUser,
  }

  return <AccountContext.Provider value={value}>{props.children}</AccountContext.Provider>
}
