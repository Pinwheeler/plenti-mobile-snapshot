import React, { useContext } from "react"
import { ScrollView, View } from "react-native"
import { PremiumContext } from "../../contexts/PremiumContext"
import { PremiumAdCopy } from "./PremiumAdCopy"
import { SubscriptionBlock } from "./SubscriptionBlock"

export const StorePageNotPremium = () => {
  const { products } = useContext(PremiumContext)

  const monthlySubscription = products.find((p) => p.subscriptionDuration === "P1M")
  const yearlySubscription = products.find((p) => p.subscriptionDuration === "P1Y")

  return (
    <ScrollView style={{ padding: 15 }}>
      <PremiumAdCopy />
      <View style={{ flexDirection: "row", marginTop: 30, justifyContent: "space-evenly", flexWrap: "wrap" }}>
        {monthlySubscription && (
          <SubscriptionBlock subscription={monthlySubscription} monthlySubscription={monthlySubscription} />
        )}
        {yearlySubscription && monthlySubscription && (
          <SubscriptionBlock subscription={yearlySubscription} monthlySubscription={monthlySubscription} />
        )}
      </View>
      <View style={{ height: 50, width: "100%" }} />
    </ScrollView>
  )
}
