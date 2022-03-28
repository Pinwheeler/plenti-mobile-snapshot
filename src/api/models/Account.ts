import { ImageEntity, ImageModel } from "./Image";
import { LoggedInAccountEntity } from "./LoggedInAccount";

export class AccountEntity {
  id: string;
  username: string;
  firstname?: string;
  profilePicture?: ImageEntity;

  constructor(model: AccountModel) {
    this.id = model.id;
    this.username = model.username;
    this.firstname = model.firstname;
    if (model.profilePicture) {
      this.profilePicture = new ImageEntity(model.profilePicture);
    }
  }

  static fromLoggedInAccount(
    loggedInEntity: LoggedInAccountEntity
  ): AccountEntity {
    return new AccountEntity({
      id: loggedInEntity.id,
      username: loggedInEntity.username,
      firstname: loggedInEntity.firstname,
      profilePicture: loggedInEntity.profilePicture,
    });
  }

  toModel(): AccountModel {
    return {
      id: this.id,
      username: this.username,
      firstname: this.firstname,
      profilePicture: this.profilePicture,
    };
  }
}

export interface AccountModel {
  id: string;
  username: string;
  firstname?: string;
  profilePicture?: ImageModel;
}
