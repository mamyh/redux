import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getMessages:builder.query({
            query:(id)
        })
    })
})