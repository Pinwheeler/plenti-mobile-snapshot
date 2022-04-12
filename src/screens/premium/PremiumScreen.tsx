import React, { useContext } from "react"
import ActivityOverlay from "../../components/ActivityOverlay"
import { AccountContext } from "../../contexts/AccountContext"
import { PremiumContext } from "../../contexts/PremiumContext"
import StorePageHasPremium from "./StorePageHasPremium"
import { StorePageNotLoggedIn } from "./StorePageNotLoggedIn"
import { StorePageNotPremium } from "./StorePageNotPremium"

export const PremiumScreen = () => {
  const { loggedInAccount } = useContext(AccountContext)
  const { hasPremium, premiumLoading } = useContext(PremiumContext)

  if (loggedInAccount === undefined) {
    return <StorePageNotLoggedIn />
  }

  if (premiumLoading) {
    return <ActivityOverlay />
  }

  if (hasPremium) {
    return <StorePageHasPremium />
  } else {
    return <StorePageNotPremium />
  }
}
