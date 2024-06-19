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

    })
})

export const {
    useGetAverageRatingMutation,
} =ratingApiSlice;