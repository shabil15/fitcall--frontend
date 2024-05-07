import { apiSlice } from "./apiSlice";

const USER_URL = "/api/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),

    logout:builder.mutation({
      query:() => ({
        url:`${USER_URL}/logout`,
        method:'POST'
      })
    }),

    googleAuth: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/googleAuth`,
        method: "POST",
        body: data,
      }),
    }),

    sendOtpToEmail: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/sendEmail`,
        method: "POST",
        body: data,
      }),
    }),

    otpVerification: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/verifyEmail`,
        method: "POST",
        body: data,
      }),
    }),

    sendOTPforgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/sendOTPforgotPassword`,
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgotPassword`,
        method: "POST",
        body: data,
      }),
    }),

    getTrainers: builder.mutation({
      query: () => ({
        url:`${USER_URL}/getTrainers`,
        methode:"GET"
      })
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOTPforgotPasswordMutation,
  useOtpVerificationMutation,
  useGoogleAuthMutation,
  useSendOtpToEmailMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useGetTrainersMutation,
} = userApiSlice;
