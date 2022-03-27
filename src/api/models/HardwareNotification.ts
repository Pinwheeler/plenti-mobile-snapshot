export class HardwareNotificationEntity {
  id: number
  title: string
  iconName?: string
  description: string
  slug: string
  blocking: boolean
  databased: boolean
  maxVersion?: string
  minVersion?: string
  createdAt: Date
  acknowledgeCommand?: () => void
  cancelCommand?: () => void

  constructor(model: HardwareNotificationModel) {
    this.id = model.id
    this.title = model.title
    this.iconName = model.iconName
    this.description = model.description
    this.slug = model.slug
    this.blocking = model.blocking
    this.databased = model.databased
    this.maxVersion = model.maxVersion
    this.minVersion = model.minVersion
    this.createdAt = new Date(model.createdAt)
  }

  toModel(): HardwareNotificationModel {
    return {
      id: this.id,
      title: this.title,
      iconName: this.iconName,
      description: this.description,
      slug: this.slug,
      blocking: this.blocking,
      databased: this.databased,
      minVersion: this.minVersion,
      maxVersion: this.maxVersion,
      createdAt: this.createdAt.toISOString(),
    }
  }

  appendCommands(ackCommand?: () => void, cancelCommand?: () => void) {
    this.acknowledgeCommand = ackCommand
    this.cancelCommand = cancelCommand
  }
}

export interface HardwareNotificationModel {
  id: number
  title: string
  iconName?: string
  description: string
  slug: string
  blocking: boolean
  databased: boolean
  minVersion?: string
  maxVersion?: string
  createdAt: string
}
