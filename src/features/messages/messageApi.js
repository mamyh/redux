import { apiSlice } from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getMessages:builder.query({
            query:(id)=>`/messages?conversationId=${id}&_sort=timestamp&_order=desc&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`
        })
    })
})

export const {useGetMessagesQuery} = messageApi;