import * as Yup from "yup";

// validation for user sign up
export const validationSchema = Yup.object({
  name: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
    .required("Please enter name"),
  mobile: Yup.string()
    .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
    .required("Please enter mobile"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please enter confirm password"),
});

// validation for login
export const loginValidation = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: Yup.string().required("Please enter password"),
});

// validation for forgetPassword

export const fogotPasswordShema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please enter confirm password"),
});

// validation for trainer join
export const validationTrainerJoin = Yup.object({
  name: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
    .required("Please enter name"),
  mobile: Yup.string()
    .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
    .required("Please enter mobile"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please enter confirm password"),
  description: Yup.string().required("Please type description"),
  language: Yup.string().required("Please select language"),
  profile_img: Yup.mixed().required("Please upload your profile pic"),
  certificate: Yup.mixed().required("Please upload your certificate"),
  specialisation: Yup.string().required("Please select specialisation"),
});


export const validationForUserUpdate = Yup.object({
  name: Yup.string()
  .min(3)
  .max(30)
  .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
  .required("Please enter name"),
mobile: Yup.string()
  .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
  .required("Please enter mobile"),
})

export const validationForUserHealth = Yup.object({
  age:Yup.string(),
  weight:Yup.string(),
  height:Yup.string(),
  goal:Yup.string(),
})

export const validationForTrainerUpdate = Yup.object({
  name: Yup.string()
  .min(3)
  .max(30)
  .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
  .required("Please enter name"),
mobile: Yup.string()
  .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
  .required("Please enter mobile"),
})

