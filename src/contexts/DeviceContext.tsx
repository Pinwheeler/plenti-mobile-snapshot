import React, { useMemo, useState } from "react"
import DeviceInfo from "react-native-device-info"
export type DeviceType = "iOS" | "Android"

interface IDeviceContext {
  deviceType: DeviceType
  deviceIdentifier: string
  shellVersion: string
  version: string
}

export const DeviceContext = React.createContext<IDeviceContext>({} as IDeviceContext)

export const DeviceProvider: React.FC = (props) => {
  const systemName = DeviceInfo.getSystemName()
  const deviceType: DeviceType = systemName === "Android" ? "Android" : "iOS"

  const version = DeviceInfo.getVersion()
  const buildNumber = DeviceInfo.getBuildNumber()

  const shellVersion = `${version}(${buildNumber})`

  const deviceIdentifier = useMemo(() => {
    return DeviceInfo.getUniqueId()
  }, [])

  const value = {
    deviceType,
    deviceIdentifier,
    shellVersion,
    version,
  }

  return <DeviceContext.Provider value={value}>{props.children}</DeviceContext.Provider>
}
