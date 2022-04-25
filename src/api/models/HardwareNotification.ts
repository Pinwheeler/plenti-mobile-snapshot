import { IconType } from "../../components/Icon"

export interface HardwareNotification {
  slug: string
  title: string
  systemPopup: boolean
  premiumOnly: boolean
  iconName?: IconType
  description: string
  blocking: boolean
  maxVersion?: string
  minVersion?: string
}
