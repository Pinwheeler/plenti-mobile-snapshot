import React from "react";
import { AccountProvider } from "./AccountContext";
import { AdProvider } from "./AdContext";
import { AuthProvider } from "./AuthContext";
import { ImageProvider } from "./ImageContext";
import { NotificationProvider } from "./NotificationContext";
import { PremiumProvider } from "./PremiumContext";

export const ContextStack: React.FC = (props) => {
  return (
    <AccountProvider>
      <AuthProvider>
        <ImageProvider>
          <NotificationProvider>
            <PremiumProvider>
              <AdProvider>{props.children}</AdProvider>
            </PremiumProvider>
          </NotificationProvider>
        </ImageProvider>
      </AuthProvider>
    </AccountProvider>
  );
};
