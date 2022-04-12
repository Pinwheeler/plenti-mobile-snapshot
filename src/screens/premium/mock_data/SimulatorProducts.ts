/*
 * This file is for IAP products that can be displayed on the simulator
 * normally, IAP products cannot be retrieved from the simulator and will cause an error for trying
 */

import { IapHubProductInformation } from "react-native-iaphub"

export const SimulatorProductMonthly: IapHubProductInformation = {
  id: "simulator_monthly",
  type: "renewable_subscription",
  sku: "S1M1",
  price: "$2.99",
  priceCurrency: "USD",
  priceAmount: 2.99,
  title: "Plenti-Full Monthly",
  description: "Monthly subscription of Plenti-Full",
  subscriptionDuration: "P1M",
}

export const SimulatorProductAnnually: IapHubProductInformation = {
  id: "simulator_annually",
  type: "renewable_subscription",
  sku: "S1Y1",
  price: "$23.99",
  priceCurrency: "USD",
  priceAmount: 23.99,
  title: "Plenti-Full Annually",
  description: "Annual subscription of Plenti-Full",
  subscriptionDuration: "P1Y",
}
