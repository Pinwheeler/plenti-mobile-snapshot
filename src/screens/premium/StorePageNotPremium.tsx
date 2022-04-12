import React, { useContext } from "react"
import { ScrollView, View } from "react-native"
import { PremiumAdCopy } from "./PremiumAdCopy"
import PremiumContext from "./PremiumContext"
import { SubscriptionBlock } from "./SubscriptionBlock"

export const StorePageNotPremium = () => {
  const { products } = useContext(PremiumContext)

  const monthlySubscription = products.find((p) => p.subscriptionDuration === "P1M")
  const yearlySubscription = products.find((p) => p.subscriptionDuration === "P1Y")

  return (
    <ScrollView style={{ padding: 15 }}>
      <PremiumAdCopy />
      <View style={{ flexDirection: "row", marginTop: 30, justifyContent: "space-evenly" }}>
        <SubscriptionBlock subscription={monthlySubscription} monthlySubscription={monthlySubscription} />
        <SubscriptionBlock subscription={yearlySubscription} monthlySubscription={monthlySubscription} />
      </View>
    </ScrollView>
  )
}
