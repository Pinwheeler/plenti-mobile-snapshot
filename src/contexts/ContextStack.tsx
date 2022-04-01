import React from "react"
import { AccountProvider } from "./AccountContext"
import { AdProvider } from "./AdContext"
import { AuthProvider } from "./AuthContext"
import { GeocodingProvider } from "./GeocodingContext"
import { ImageProvider } from "./ImageContext"
import { InventoryProvider } from "./InventoryContext"
import { NotificationProvider } from "./NotificationContext"
import { PremiumProvider } from "./PremiumContext"
import { SecretsProvider } from "./SecretsContext"

export const ContextStack: React.FC = (props) => {
  return (
    <AccountProvider>
      <AuthProvider>
        <SecretsProvider>
          <ImageProvider>
            <NotificationProvider>
              <PremiumProvider>
                <AdProvider>
                  <GeocodingProvider>
                    <InventoryProvider>{props.children}</InventoryProvider>
                  </GeocodingProvider>
                </AdProvider>
              </PremiumProvider>
            </NotificationProvider>
          </ImageProvider>
        </SecretsProvider>
      </AuthProvider>
    </AccountProvider>
  )
}
