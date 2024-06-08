import { apiSlice } from "./apiSlice";

const TRAINER_URL = "/api/trainer";

export const trainerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    trainerLogin: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    trainerRegister: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),

    trainerLogout: builder.mutation({
      query: () => ({
        url: `${TRAINER_URL}/logout`,
        method: "POST",
      }),
    }),

    updateTrainerProfile: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/updateTrainerProfile`,
        method: "PATCH",
        body: data,
      }),
    }),

    setTrainerImg: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/addProfile`,
        method: "PATCH",
        body: data,
      }),
    }),

    getClients: builder.mutation({
      query: (trainerId) => ({
        url: `${TRAINER_URL}/getClientS`,
        method: 'POST',
        body: { trainerId },
      })
    }),


    addDescription:builder.mutation({
      query:({trainerId,description}) => ({
        url:`${TRAINER_URL}/addDescription/${trainerId}`,
        method:'PATCH',
        body:description,
      })
    }),

    addExperience:builder.mutation({
      query:({trainerId,experience}) => ({
        url:`${TRAINER_URL}/addExperience/${trainerId}`,
        method:'PATCH',
        body:experience,
      })
    }),

  }),
});

export const {
  useTrainerLoginMutation,
  useTrainerRegisterMutation,
  useTrainerLogoutMutation,
  useUpdateTrainerProfileMutation,
  useSetTrainerImgMutation,
  useGetClientsMutation,
  useAddDescriptionMutation,
  useAddExperienceMutation,
} = trainerApiSlice;
