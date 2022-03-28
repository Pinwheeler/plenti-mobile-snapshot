import Axios from "axios";
import React, { useContext } from "react";
import { GeocodeResultEntity, GeocodeResultModel } from "../lib/GeocodeResult";
import { SecretsContext } from "./SecretsContext";

interface IGeocodingContext {
  geocode(address: string): Promise<GeocodeResultEntity>;
}

export const GeocodingContext = React.createContext({} as IGeocodingContext);

export const GeocodingProvider: React.FC = (props) => {
  const { SECRETS } = useContext(SecretsContext);
  const geocode = (address: string) =>
    Axios.get<GeocodeResultModel>(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: address,
          key: SECRETS.OPEN_CAGE_API_KEY,
        },
      }
    ).then((response) => new GeocodeResultEntity(response.data));

  const value = { geocode };

  return (
    <GeocodingContext.Provider value={value}>
      {props.children}
    </GeocodingContext.Provider>
  );
};
