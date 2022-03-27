import * as yup from "yup"

export const AccountLoginValidator = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})
