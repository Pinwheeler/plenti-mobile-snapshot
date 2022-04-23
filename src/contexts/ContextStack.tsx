import React from "react"
import { NearMeProvider } from "../screens/home/NearMeContext"
import { AccountProvider } from "./AccountContext"
import { AdProvider } from "./AdContext"
import { AppProvider } from "./AppContext"
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
import { WatcherProvider } from "./WatcherContext"

export const ContextStack: React.FC = (props) => {
  return (
    <AppProvider>
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
                          <WatcherProvider>
                            <InventoryProvider>
                              <NearMeProvider>
                                <ChatProvider>{props.children}</ChatProvider>
                              </NearMeProvider>
                            </InventoryProvider>
                          </WatcherProvider>
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
    </AppProvider>
  )
}
