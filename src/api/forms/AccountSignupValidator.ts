import * as yup from "yup"

export const AccountSignupValidator = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirm: yup.string().required(),
})
