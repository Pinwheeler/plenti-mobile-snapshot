import React from "react";
import { AdProvider } from "./AdContext";
import { AuthProvider } from "./AuthContext";
import { PremiumProvider } from "./PremiumContext";

export const ContextStack: React.FC = (props) => {
  return (
    <AuthProvider>
      <PremiumProvider>
        <AdProvider>{props.children}</AdProvider>
      </PremiumProvider>
    </AuthProvider>
  );
};
