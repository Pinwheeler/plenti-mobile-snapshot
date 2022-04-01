import { fromISOTime, optoISOTime } from "../../lib/DateHelper"
import { AccountEntity } from "./Account"

export function isLoggedInAccount(account: AccountEntity | LoggedInAccountEntity): account is LoggedInAccountEntity {
  return (account as LoggedInAccountEntity).prefersMetric !== undefined
}

export class LoggedInAccountEntity extends AccountEntity {
  email: string
  authToken: string
  latitude?: number
  longitude?: number
  pickupAddress?: string
  prefersMetric: boolean
  maxDistance: number
  premiumUntil?: Date
  iapId: string
  blockedUsers: { blockedUserId: string; reason?: string }[]

  constructor(model: LoggedInAccountModel) {
    super(model)
    this.email = model.email
    this.authToken = model.authToken
    this.latitude = model.latitude
    this.longitude = model.longitude
    this.pickupAddress = model.pickupAddress
    this.prefersMetric = model.prefersMetric
    this.maxDistance = model.maxDistance
    this.premiumUntil = model.premiumUntil ? fromISOTime(model.premiumUntil) : undefined
    this.iapId = model.iapId
    this.blockedUsers = model.blockedUsers
  }

  toModel(): LoggedInAccountModel {
    return {
      uid: this.uid,
      email: this.email,
      username: this.username,
      firstname: this.firstname,
      authToken: this.authToken,
      latitude: this.latitude,
      longitude: this.longitude,
      pickupAddress: this.pickupAddress,
      prefersMetric: this.prefersMetric,
      maxDistance: this.maxDistance,
      premiumUntil: optoISOTime(this.premiumUntil),
      iapId: this.iapId,
      blockedUsers: this.blockedUsers,
    }
  }
}

export interface LoggedInAccountModel {
  uid: string
  email: string
  username: string
  firstname?: string
  authToken: string
  latitude?: number
  longitude?: number
  pickupAddress?: string
  prefersMetric: boolean
  maxDistance: number
  premiumUntil?: string
  iapId: string
  blockedUsers: { uid: string; reason?: string }[]
}
