import { apiSlice } from "../api/apiSlice";

const userApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addUser:builder.mutation({
            query:(data)=>({
                url:'/users',
                method:'POST',
                body:data,
            })
        })
    })
});

export const {useAddUserMutation} = userApi;