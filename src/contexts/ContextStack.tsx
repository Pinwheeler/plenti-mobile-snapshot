import React from "react";
import { AdProvider } from "./AdContext";
import { AuthProvider } from "./AuthContext";
import { DataProvider } from "./DataContext";
import { ImageProvider } from "./ImageContext";
import { NotificationProvider } from "./NotificationContext";
import { PremiumProvider } from "./PremiumContext";

export const ContextStack: React.FC = (props) => {
  return (
    <DataProvider>
      <AuthProvider>
        <ImageProvider>
          <NotificationProvider>
            <PremiumProvider>
              <AdProvider>{props.children}</AdProvider>
            </PremiumProvider>
          </NotificationProvider>
        </ImageProvider>
      </AuthProvider>
    </DataProvider>
  );
};
