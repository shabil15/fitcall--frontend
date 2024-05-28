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
      query: ({ page, per_page, specialisation, language, search }) => ({
        url:`${USER_URL}/getTrainers`,
        method:"GET",
        params: {
          page,
          per_page,
          specialisation,
          language,
          search,
        }
      })
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/updateProfile`,
        method: "PATCH",
        body: data,
      }),
    }),

    getTrainerDetails:builder.mutation({
      query:(id) =>({
        url:`trainers/profile?id=${id}`,
        method:'GET',
      })
    }),
    setUserImg: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/addProfile`,
        method: "PATCH",
        body: data,
      }),
    }),

    payment:builder.mutation({
      query:(data)=>({
          url:`${USER_URL}/payment`,
          method:'POST',
          body:data
      })
  }),

  updateHealth: builder.mutation({
    query: (data) => ({
      url: `${USER_URL}/updateHealth`,
      method: "PATCH",
      body: data,
    }),
  }),


  setTrainer: builder.mutation({
    query:({ userId, trainerId }) => ({
      url:`${USER_URL}/setTrainer`,
      method:"PATCH",
      body:{ userId, trainerId }
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
  useGetTrainerDetailsMutation,
  useUpdateProfileMutation,
  useSetUserImgMutation,
  usePaymentMutation,
  useUpdateHealthMutation,
  useSetTrainerMutation
} = userApiSlice;
