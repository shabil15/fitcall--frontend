import { apiSlice } from "./apiSlice";

const ADMIN_URL ='/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) => ({

    adminLogin: builder.mutation({
      query:(data) => ({
        url: `${ADMIN_URL}/login`,
        method:"POST",
        body:data,
      })
    }),

    getUsersData: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getUsers`,
        method: "GET",
      }),
    }),

    putBlockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users/unblock-block?id=${data}`,
        method: "PATCH",
      }),
    }),

    getJoinRequests : builder.mutation({
      query:() => ({
        url:`${ADMIN_URL}/getJoinRequests`,
        method:"GET",
      })
    }),

    reviewRequests: builder.mutation({
      query:(data) => ({
        url:`${ADMIN_URL}/reviewRequests`,
        method:"PATCH",
        body:data,
      }),
    })

  })
})


export const {
  useAdminLoginMutation,
  useGetUsersDataMutation,
  useGetJoinRequestsMutation,
  usePutBlockUserMutation,
  useReviewRequestsMutation,
}= adminApiSlice;