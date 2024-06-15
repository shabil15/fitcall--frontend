import {apiSlice} from './apiSlice';

const CHAT_URL = '/api/chat'


export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({

        createConversation:builder.mutation({
            query:(data) => ({
                url:`${CHAT_URL}/conversation`,
                method:"POST",
                body:data,
                credentials:'include',
            }),
        }),

        sendMessage: builder.mutation({
            query:(data) => ({
                url:`${CHAT_URL}/message`,
                method:"POST",
                body:data,
                credentials:'include',
            }),
        }),

        getMessage: builder.mutation({
            query:(conversationId) => ({
                url:`${CHAT_URL}/message`,
                method:"GET",
                params:{conversationId},
                credentials:'include',
            }),
        }),

    }),
})

export const {
    useCreateConversationMutation,
    useSendMessageMutation,
    useGetMessageMutation,

} =chatApiSlice;