
import * as Yup from "yup";
export const userSchema = Yup.object({
    full_name: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contact: Yup.string()
      .matches(
        /^(09\d{9}|(\+63)9\d{9})$/,
        "Contact must be a valid Philippine phone number (e.g., 09123456789 or +639123456789)"
      )
      .required("Contact is required"),
  });