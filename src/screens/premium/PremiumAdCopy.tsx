import React from "react"
import { View, Image } from "react-native"
import { Paragraph } from "react-native-paper"
import BenefitLine from "./BenefitLine"

export const PremiumAdCopy = () => {
  return (
    <>
      <Image
        source={require("./img/plenti-full.png")}
        style={{ flex: 5, height: 250, width: "100%" }}
        resizeMode={"contain"}
      />
      <Paragraph style={{ fontWeight: "600", textAlign: "center", marginVertical: 15, fontSize: 18 }}>
        {"Get More from Plenti-Full\n our premium subscription service!"}
      </Paragraph>
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
    </>
  )
}
