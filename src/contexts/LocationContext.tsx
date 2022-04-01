import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import Geolocation, { GeoPosition } from "react-native-geolocation-service"
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions"
import { AccountContext } from "./AccountContext"
import { DeviceContext } from "./DeviceContext"
import { NotificationContext } from "./NotificationContext"

interface ILocationContext {
  getCurrentPosition: () => Promise<GeoPosition>
  lastKnownPosition?: GeoPosition
  distanceInKMToPoint: (lat: number, lng: number) => number | undefined
  distanceInMiToPoint: (lat: number, lng: number) => number | undefined
  convertKMToMi: (km: number) => number
  convertMiToKM: (mi: number) => number
  distanceInPreferredUnits: (km: number) => string
  isCurrentlyCheckingPermissions: boolean
}

const LocationContext = React.createContext({} as ILocationContext)

const R = 6371 // Radius of the earth
export const LOCATION_SLUG = "LOCATION"

const LocationProvider: React.FC = (props) => {
  const [lastKnownPosition, setLastKnownPosition] = useState<GeoPosition>()
  const [isCurrentlyCheckingPermissions, setIsCurrentlyCHeckingPermissions] = useState(false)
  const { loggedInAccount } = useContext(AccountContext)
  const { deviceType } = useContext(DeviceContext)
  const { hasSlugBeenAck } = useContext(NotificationContext)

  const acceptedLocationCheck = useMemo(() => {
    return hasSlugBeenAck(LOCATION_SLUG)
  }, [hasSlugBeenAck])

  useEffect(() => {
    if (acceptedLocationCheck) {
      let permissionCheck: Promise<any>
      switch (deviceType) {
        case "iOS":
          permissionCheck = check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          break
        case "Android":
          permissionCheck = check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
          break
      }
      setIsCurrentlyCHeckingPermissions(true)
      permissionCheck
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              throw new Error("Location permission not available on this device / in this context")
            case RESULTS.DENIED: {
              // persmission has not yet been requested / is denied but is requestable
              let req
              switch (deviceType) {
                case "iOS":
                  req = request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                  break
                case "Android":
                  req = request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
                  break
              }
              req.then((result) => {
                switch (result) {
                  case RESULTS.GRANTED:
                    getCurrentPosition()
                    break
                  default:
                    throw new Error("the user rejected location permissions")
                }
              })
              break
            }
            case RESULTS.GRANTED:
              getCurrentPosition()
              break
            case RESULTS.BLOCKED:
              throw new Error("Location permission is denied and not requestable anymore")
          }
        })
        .finally(() => {
          setIsCurrentlyCHeckingPermissions(false)
        })
    }
  }, [acceptedLocationCheck])

  const getCurrentPosition = useCallback(() => {
    if (acceptedLocationCheck) {
      const positionPromise: Promise<GeoPosition> = new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error),
        )
      })
      positionPromise.then((position) => setLastKnownPosition(position))
      return positionPromise
    } else {
      return Promise.reject("User has not yet accepted location checking")
    }
  }, [acceptedLocationCheck])

  const toRadians = (degrees: number) => {
    return (degrees * Math.PI) / 180
  }

  const distanceInMetersToPoint = (targetLat: number, targetLng: number) => {
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
    const prefersMetric = account.prefersMetric ? true : false
    if (prefersMetric) {
      return `${km.toFixed(2)} km`
    } else {
      return `${convertKMToMi(km).toFixed(2)} mi`
    }
  }

  const value = {
    getCurrentPosition,
    lastKnownPosition,
    distanceInKMToPoint,
    distanceInMiToPoint,
    convertKMToMi,
    convertMiToKM,
    distanceInPreferredUnits,
    isCurrentlyCheckingPermissions,
  }

  return <LocationContext.Provider value={value}>{props.children}</LocationContext.Provider>
}

export default LocationContext
export { ILocationContext, LocationProvider }
