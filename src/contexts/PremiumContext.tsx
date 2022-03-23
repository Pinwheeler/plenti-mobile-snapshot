import React from "react";

interface IPremiumContext {
  hasPremium: boolean;
}

export const PremiumContext = React.createContext({} as IPremiumContext);

export const PremiumProvider: React.FC = (props) => {
  const value = {
    hasPremium: false,
  };

  return (
    <PremiumContext.Provider value={value}>
      {props.children}
    </PremiumContext.Provider>
  );
};
