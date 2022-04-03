import React from "react"
import { NearMeProvider } from "../screens/home/NearMeContext"
import { AccountProvider } from "./AccountContext"
import { AdProvider } from "./AdContext"
import { AuthProvider } from "./AuthContext"
import { ChatProvider } from "./ChatContext"
import { DeviceProvider } from "./DeviceContext"
import { GeocodingProvider } from "./GeocodingContext"
import { ImageProvider } from "./ImageContext"
import { InventoryProvider } from "./InventoryContext"
import { LocationProvider } from "./LocationContext"
import { NotificationProvider } from "./NotificationContext"
import { PremiumProvider } from "./PremiumContext"
import { SecretsProvider } from "./SecretsContext"

export const ContextStack: React.FC = (props) => {
  return (
    <DeviceProvider>
      <AccountProvider>
        <AuthProvider>
          <NotificationProvider>
            <LocationProvider>
              <SecretsProvider>
                <ImageProvider>
                  <PremiumProvider>
                    <AdProvider>
                      <GeocodingProvider>
                        <InventoryProvider>
                          <NearMeProvider>
                            <ChatProvider>{props.children}</ChatProvider>
                          </NearMeProvider>
                        </InventoryProvider>
                      </GeocodingProvider>
                    </AdProvider>
                  </PremiumProvider>
                </ImageProvider>
              </SecretsProvider>
            </LocationProvider>
          </NotificationProvider>
        </AuthProvider>
      </AccountProvider>
    </DeviceProvider>
  )
}
