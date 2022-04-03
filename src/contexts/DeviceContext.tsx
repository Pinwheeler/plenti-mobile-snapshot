import React, { useMemo, useState } from "react"
import DeviceInfo from "react-native-device-info"
export type DeviceType = "iOS" | "Android"

interface IDeviceContext {
  deviceType: DeviceType
  deviceIdentifier: string
  // isEmulator: boolean
  shellVersion: string
  version: string
}

export const DeviceContext = React.createContext<IDeviceContext>({} as IDeviceContext)

export const DeviceProvider: React.FC = (props) => {
  const [isEmulator, setIsEmulator] = useState<boolean | undefined>()
  const systemName = DeviceInfo.getSystemName()
  const deviceType: DeviceType = systemName === "Android" ? "Android" : "iOS"

  const version = DeviceInfo.getVersion()
  const buildNumber = DeviceInfo.getBuildNumber()

  const shellVersion = `${version}(${buildNumber})`

  // DeviceInfo.isEmulator().then((value) => {
  //   setIsEmulator(value)
  // })

  const deviceIdentifier = useMemo(() => {
    return DeviceInfo.getUniqueId()
  }, [])

  const value = {
    deviceType,
    deviceIdentifier,
    isEmulator,
    shellVersion,
    version,
  }

  return <DeviceContext.Provider value={value}>{props.children}</DeviceContext.Provider>
}
