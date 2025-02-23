import * as yup from "yup";

export const addUserSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Login must contain at least 4 characters")
    .required("Name is required"),
  login: yup
    .string()
    .min(4, "Login must contain at least 4 characters")
    .required("Login is required"),
  mail: yup.string().email("Enter a valid email").required("Email is required"),
  role: yup.string().email("Enter a valid email").required("Role is required"),
  status: yup.string()
    .min(1, "Status must contain at least 1 character")
    .required("Status is required"),
  password: yup
    .string()
    .min(6, "Password must contain at least 6 characters")
    .required("Enter your password"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
  image: yup.string().url("Image Path is not valid").optional(),
  phone: yup.string().optional(),
  address: yup.string().optional(),
  about: yup.string().optional(),
  profession: yup.string().optional(),
  createdAt: yup.date().default(() => new Date()),
  groupId: yup.number().required("Group is required"),
});
export type AddUserType = yup.InferType<typeof addUserSchema>;