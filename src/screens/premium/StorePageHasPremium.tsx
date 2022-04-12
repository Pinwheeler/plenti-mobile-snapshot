import React from "react"
import { Image, ScrollView, View } from "react-native"
import { Text } from "react-native-paper"
import BenefitLine from "./BenefitLine"

const StorePageHasPremium = () => {
  return (
    <ScrollView style={{ padding: 15 }}>
      <Image
        source={require("./img/plenti-full.png")}
        style={{ flex: 5, height: 250, width: "100%" }}
        resizeMode={"contain"}
      />
      <Text style={{ textAlign: "center", fontSize: 15, marginVertical: 15 }}>
        {"Thank you for purchasing a Plenti-Full subscription!\nYour support means the world to us!"}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "32%" }}>
          <BenefitLine
            image={require("./img/notifications.png")}
            text="Set up alerts for when people near you add produce that you want"
          />
        </View>
        <View style={{ width: "1.5%" }} />
        <View style={{ width: "32%" }}>
          <BenefitLine
            image={require("./img/community_support.png")}
            text="Support development on this grass-roots community building app"
          />
        </View>
        <View style={{ width: "1.5%" }} />
        <View style={{ width: "32%" }}>
          <BenefitLine image={require("./img/no_ads.png")} text="No more advertisements" />
        </View>
      </View>
    </ScrollView>
  )
}

export default StorePageHasPremium
