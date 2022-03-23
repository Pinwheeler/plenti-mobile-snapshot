import React from "react";

interface IAdContext {
  shouldShowAds: boolean;
}

export const AdContext = React.createContext({} as IAdContext);

export const AdProvider: React.FC = (props) => {
  return (
    <AdContext.Provider value={{ shouldShowAds: false }}>
      {props.children}
    </AdContext.Provider>
  );
};
