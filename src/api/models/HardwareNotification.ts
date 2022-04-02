export interface HardwareNotification {
  slug: string
  title: string
  iconName?: string
  description: string
  blocking: boolean
  maxVersion?: string
  minVersion?: string
}
