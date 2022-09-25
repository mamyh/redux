import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`
        }),
        addMessage:builder.mutation({
            query:(data)=>({
                url:'/messages',
                method:'POST',
                body:data
            })
        })
    })
})

export const { useGetMessagesQuery } = messageApi;