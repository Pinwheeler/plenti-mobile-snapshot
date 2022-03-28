import { DateTime } from "luxon";
import { AccountEntity } from ".";

export class LoggedInAccountEntity extends AccountEntity {
  email: string;
  authToken: string;
  latitude?: number;
  longitude?: number;
  pickupAddress?: string;
  prefersMetric: boolean;
  maxDistance: number;
  premiumUntil?: DateTime;
  iapId: string;

  constructor(model: LoggedInAccountModel) {
    super(model);
    this.email = model.email;
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
}
