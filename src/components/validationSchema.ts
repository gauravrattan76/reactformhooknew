// validationSchema.ts
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Minimum 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email"),
  gender: yup.string().required("Gender is required"),
  hobby: yup.string().required("Hobby is required"),
});