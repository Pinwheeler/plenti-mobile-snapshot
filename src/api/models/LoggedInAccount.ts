import { fromISOTime, optoISOTime } from "../../lib/DateHelper"
import { AccountEntity } from "./Account"

export type BlockedUsers = { [blockedUserId: string]: { uid: string; reason: string } }

export function isLoggedInAccount(account: AccountEntity | LoggedInAccountEntity): account is LoggedInAccountEntity {
  return (account as LoggedInAccountEntity).prefersMetric !== undefined
}

export class LoggedInAccountEntity extends AccountEntity {
  email: string
  authToken: string
  prefersMetric: boolean
  maxDistance: number // in KM
  premiumUntil?: Date
  iapId: string
  blockedUsers: BlockedUsers

  constructor(model: LoggedInAccountModel) {
    super(model)
    this.email = model.email
    this.authToken = model.authToken
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
  prefersMetric: boolean
  maxDistance: number
  premiumUntil?: string
  iapId: string
  blockedUsers: BlockedUsers
}
