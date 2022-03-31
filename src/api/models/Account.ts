import { LoggedInAccountEntity } from "./LoggedInAccount"

export class AccountEntity {
  uid: string
  username: string
  firstname?: string

  constructor(model: AccountModel) {
    this.uid = model.uid
    this.username = model.username
    this.firstname = model.firstname
  }

  static fromLoggedInAccount(loggedInEntity: LoggedInAccountEntity): AccountEntity {
    return new AccountEntity({
      uid: loggedInEntity.uid,
      username: loggedInEntity.username,
      firstname: loggedInEntity.firstname,
    })
  }

  toModel(): AccountModel {
    return {
      uid: this.uid,
      username: this.username,
      firstname: this.firstname,
    }
  }
}

export interface AccountModel {
  uid: string
  username: string
  firstname?: string
}
