import React from "react";

interface IApiContext {}

export const ApiContext = React.createContext({} as IApiContext);

export const ApiProvider: React.FC = (props) => {
  const value = {};

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
};
