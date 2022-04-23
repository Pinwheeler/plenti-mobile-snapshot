import { useTheme } from "@rneui/themed"
import React, { useContext, useMemo } from "react"
import { View } from "react-native"
import { IapHubProductInformation } from "react-native-iaphub"
import { Surface, Text, TouchableRipple } from "react-native-paper"
import { PremiumContext } from "../../contexts/PremiumContext"

interface Props {
  subscription: IapHubProductInformation
  monthlySubscription: IapHubProductInformation
}

export const SubscriptionBlock: React.FC<Props> = (props) => {
  const { subscription, monthlySubscription } = props
  const { purchaseProduct } = useContext(PremiumContext)
  const { theme } = useTheme()

  const durationLine = useMemo(() => {
    switch (subscription.subscriptionDuration) {
      case "P1M":
        return "Monthly"
      case "P1Y":
        return "Annually"
      case "P3M":
        return "Quarterly"
      case "P6M":
        return "Biennially"
      default:
        return { duration: "Error", discountView: <Text>Error</Text> }
    }
  }, [subscription])

  return (
    <TouchableRipple
      style={{ flex: 1, marginHorizontal: 8, minWidth: 162, marginVertical: 10 }}
      onPress={() => purchaseProduct(subscription)}
    >
      <Surface
        style={{ padding: 10, elevation: 3.5, borderColor: theme.colors.secondary, borderLeftWidth: 3, minHeight: 145 }}
      >
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: "900",
            marginBottom: 5,
            textAlign: "center",
          }}
        >
          {durationLine}
        </Text>
        <Text style={{ fontSize: 45, fontWeight: "200", color: theme.colors.grey4, textAlign: "center" }}>
          {subscription.price}
        </Text>
        <DiscountView subscription={subscription} monthlySubscription={monthlySubscription} />
      </Surface>
    </TouchableRipple>
  )
}

interface DiscountViewProps {
  subscription: IapHubProductInformation
  monthlySubscription: IapHubProductInformation
}

const DiscountView: React.FC<DiscountViewProps> = (props) => {
  const { subscription, monthlySubscription } = props
  const { theme } = useTheme()
  const monthlyPrice = `${monthlySubscription.price}/month`
  const discountPrice = useMemo(() => {
    let p: number = 0
    switch (subscription.subscriptionDuration) {
      case "P1Y":
        {
          p = subscription.priceAmount / 12 //number of months in a year
        }
        break
      case "P3M":
        {
          p = subscription.priceAmount / 3
        }
        break
      case "P6M":
        {
          p = subscription.priceAmount / 6
        }
        break
    }
    return `$${p.toFixed(2)}/month`
  }, [subscription])

  if (subscription.id === monthlySubscription.id) {
    // this IS the monthly subscription
    return (
      <View
        style={{
          height: 34,
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center", color: theme.colors.grey3 }}>{monthlyPrice}</Text>
      </View>
    )
  } else {
    return (
      <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.colors.grey3, textDecorationLine: "line-through" }}>{monthlyPrice}</Text>
        <Text style={{ color: theme.colors.primary }}>{discountPrice}</Text>
      </View>
    )
  }
}
