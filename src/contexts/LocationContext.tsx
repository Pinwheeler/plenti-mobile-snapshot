import * as Location from "expo-location"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { Logger } from "../lib/Logger"
import { AccountContext } from "./AccountContext"
import { AppContext } from "./AppContext"
import { NotificationContext } from "./NotificationContext"

interface ILocationContext {
  lastKnownPosition?: Location.LocationObject
  distanceInKMToPoint: (lat: number, lng: number) => number
  distanceInMiToPoint: (lat: number, lng: number) => number
  convertKMToMi: (km: number) => number
  convertMiToKM: (mi: number) => number
  distanceInPreferredUnits: (km: number) => string
}

export const LocationContext = React.createContext({} as ILocationContext)

const R = 6371 // Radius of the earth
export const LOCATION_SLUG = "LOCATION"

export const LocationProvider: React.FC = (props) => {
  const [lastKnownPosition, setLastKnownPosition] = useState<Location.LocationObject>()
  const { loggedInAccount } = useContext(AccountContext)
  const { hasSlugBeenAck } = useContext(NotificationContext)
  const { setAppwideError } = useContext(AppContext)

  const acceptedLocationCheck = useMemo(() => {
    return hasSlugBeenAck(LOCATION_SLUG)
  }, [hasSlugBeenAck])

  useEffect(() => {
    ;(async () => {
      if (acceptedLocationCheck) {
        let foreground = await Location.requestForegroundPermissionsAsync()
        if (foreground.status !== "granted") {
          setAppwideError(new Error("Permission to access location was denied"))
          return
        }

        let location = await Location.getCurrentPositionAsync({})
        setLastKnownPosition(location)
      }
    })()
  }, [acceptedLocationCheck])

  const toRadians = (degrees: number) => {
    return (degrees * Math.PI) / 180
  }

  const distanceInMetersToPoint = (targetLat: number, targetLng: number) => {
    if (!lastKnownPosition) {
      const reason = "trying to get distance without knowing the user's location"
      Logger.error(reason)
      throw new Error(reason)
    }
    const currentLat = lastKnownPosition.coords.latitude
    const currentLng = lastKnownPosition.coords.longitude
    const latDistance = toRadians(targetLat - currentLat)
    const lngDistance = toRadians(targetLng - currentLng)
    const a =
      Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
      Math.cos(toRadians(targetLat)) *
        Math.cos(toRadians(currentLat)) *
        Math.sin(lngDistance / 2) *
        Math.sin(lngDistance / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let distance = R * c * 1000 // convert to meters
    distance = Math.pow(distance, 2) /*+ Math.pow(height, 2)*/
    return Math.sqrt(distance)
  }

  const distanceInKMToPoint = (lat: number, lng: number) => {
    const meters = distanceInMetersToPoint(lat, lng)
    return meters * 0.001
  }

  const distanceInMiToPoint = (lat: number, lng: number) => {
    const meters = distanceInMetersToPoint(lat, lng)
    return meters * 0.000621371
  }

  const convertKMToMi = (km: number) => {
    return km / 1.609
  }

  const convertMiToKM = (mi: number) => {
    return mi * 1.609
  }

  const distanceInPreferredUnits = (km: number) => {
    const prefersMetric = loggedInAccount?.prefersMetric ? true : false
    if (prefersMetric) {
      return `${km.toFixed(2)} km`
    } else {
      return `${convertKMToMi(km).toFixed(2)} mi`
    }
  }

  const value = {
    lastKnownPosition,
    distanceInKMToPoint,
    distanceInMiToPoint,
    convertKMToMi,
    convertMiToKM,
    distanceInPreferredUnits,
  }

  return <LocationContext.Provider value={value}>{props.children}</LocationContext.Provider>
}
