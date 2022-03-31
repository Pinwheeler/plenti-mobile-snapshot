import { LoggedInAccountEntity } from "./LoggedInAccount"

export class AccountEntity {
  id: string
  username: string
  firstname?: string

  constructor(model: AccountModel) {
    this.id = model.id
    this.username = model.username
    this.firstname = model.firstname
  }

  static fromLoggedInAccount(loggedInEntity: LoggedInAccountEntity): AccountEntity {
    return new AccountEntity({
      id: loggedInEntity.id,
      username: loggedInEntity.username,
      firstname: loggedInEntity.firstname,
    })
  }

  toModel(): AccountModel {
    return {
      id: this.id,
      username: this.username,
      firstname: this.firstname,
    }
  }
}

export interface AccountModel {
  id: string
  username: string
  firstname?: string
}
