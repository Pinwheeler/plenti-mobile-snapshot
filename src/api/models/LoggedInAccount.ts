import { fromISOTime, optoISOTime } from "../../lib/DateHelper"
import { AccountEntity } from "./Account"

export function isLoggedInAccount(account: AccountEntity | LoggedInAccountEntity): account is LoggedInAccountEntity {
  return (account as LoggedInAccountEntity).prefersMetric !== undefined
}

export interface PickupLocation {
  address: string
  latitude: number
  longitude: number
}

export class LoggedInAccountEntity extends AccountEntity {
  email: string
  authToken: string
  pickupLocation?: PickupLocation
  prefersMetric: boolean
  maxDistance: number // in KM
  premiumUntil?: Date
  iapId: string
  blockedUsers: { blockedUserId: string; reason?: string }[]

  constructor(model: LoggedInAccountModel) {
    super(model)
    this.email = model.email
    this.authToken = model.authToken
    this.pickupLocation = model.pickupLocation
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
      pickupLocation: this.pickupLocation,
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
  pickupLocation?: PickupLocation
  prefersMetric: boolean
  maxDistance: number
  premiumUntil?: string
  iapId: string
  blockedUsers: { blockedUserId: string; reason?: string }[]
}
