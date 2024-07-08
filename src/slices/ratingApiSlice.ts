import {apiSlice} from './apiSlice';

const RATING_URL = '/api/rating'


export const ratingApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getAverageRating: builder.mutation({
            query:(trainerId) => ({
                url:`${RATING_URL}/average/${trainerId}`,
                method:"GET",
            }),
        }),

        addRating: builder.mutation({
            query: (ratingData) => ({
              url: `${RATING_URL}/addRating`,
              method: 'POST',
              body: ratingData,
            }),
          }),

    })
})

export const {
    useGetAverageRatingMutation,
    useAddRatingMutation,
} =ratingApiSlice;