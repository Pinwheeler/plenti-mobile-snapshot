import React from "react";
import { AdProvider } from "./AdContext";
import { ApiProvider } from "./ApiContext";
import { AuthProvider } from "./AuthContext";
import { DataProvider } from "./DataContext";
import { PremiumProvider } from "./PremiumContext";

export const ContextStack: React.FC = (props) => {
  return (
    <AuthProvider>
      <DataProvider>
        <ApiProvider>
          <PremiumProvider>
            <AdProvider>{props.children}</AdProvider>
          </PremiumProvider>
        </ApiProvider>
      </DataProvider>
    </AuthProvider>
  );
};
