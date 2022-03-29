import { ImageUploadForm } from "./ImageUploadForm";

export interface AccountUpdateForm {
  firstname?: string;
  username?: string;
  latitude?: string;
  longitude?: string;
  pickupAddress?: string;
  prefersMetric?: boolean;
  maxDistance?: number;
  profilePicture?: ImageUploadForm;
}
