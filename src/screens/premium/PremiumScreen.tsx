import React, { useContext } from "react"
import AccountContext from "src/account/AccountContext"
import ActivityOverlay from "src/shared/ActivityOverlay"
import PremiumContext from "./PremiumContext"
import StorePageHasPremium from "./StorePageHasPremium"
import { StorePageNotLoggedIn } from "./StorePageNotLoggedIn"
import { StorePageNotPremium } from "./StorePageNotPremium"

const PremiumScreen = () => {
  const { account } = useContext(AccountContext)
  const { hasPremium, premiumLoading } = useContext(PremiumContext)

  if (account === undefined) {
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

export default PremiumScreen
