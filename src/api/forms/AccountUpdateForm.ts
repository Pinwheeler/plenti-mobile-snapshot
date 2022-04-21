import { ImageUploadForm } from "./ImageUploadForm"

export interface AccountUpdateForm {
  firstname?: string
  username?: string
  latitude?: number
  longitude?: number
  pickupAddress?: string
  prefersMetric?: boolean
  maxDistance?: number
  profilePicture?: ImageUploadForm
}
