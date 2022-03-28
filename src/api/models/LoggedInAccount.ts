import { DateTime } from "luxon";
import { AccountModel } from "./Account";
import { ImageModel } from "./Image";

export class LoggedInAccountEntity implements AccountModel {
  id: string;
  email: string;
  username: string;
  firstname?: string;
  authToken: string;
  latitude?: number;
  longitude?: number;
  pickupAddress?: string;
  prefersMetric: boolean;
  maxDistance: number;
  premiumUntil?: DateTime;
  profilePicture?: ImageModel;
  iapId: string;

  constructor(model: LoggedInAccountModel) {
    this.id = model.id;
    this.email = model.email;
    this.username = model.username;
    this.firstname = model.firstname;
    this.authToken = model.authToken;
    this.latitude = model.latitude;
    this.longitude = model.longitude;
    this.pickupAddress = model.pickupAddress;
    this.prefersMetric = model.prefersMetric;
    this.maxDistance = model.maxDistance;
    this.premiumUntil = model.premiumUntil
      ? DateTime.fromISO(model.premiumUntil)
      : undefined;
    this.iapId = model.iapId;
    this.profilePicture = model.profilePicture;
  }

  toModel(): LoggedInAccountModel {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      firstname: this.firstname,
      authToken: this.authToken,
      latitude: this.latitude,
      longitude: this.longitude,
      pickupAddress: this.pickupAddress,
      prefersMetric: this.prefersMetric,
      maxDistance: this.maxDistance,
      premiumUntil: this.premiumUntil?.toISO(),
      iapId: this.iapId,
      profilePicture: this.profilePicture,
    };
  }
}

export interface LoggedInAccountModel {
  id: string;
  email: string;
  username: string;
  firstname?: string;
  authToken: string;
  latitude?: number;
  longitude?: number;
  pickupAddress?: string;
  prefersMetric: boolean;
  maxDistance: number;
  premiumUntil?: string;
  iapId: string;
  profilePicture?: ImageModel;
}
