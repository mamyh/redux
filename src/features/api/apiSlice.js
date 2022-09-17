 import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


 export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.REACT_APP_API_URL,
        prepareHeaders: async(headers,{getState,endpoints})=>{
           const token = getState()?.auth?.accessToken;
           
           if(token){
             headers.set('Authorization',`Bearer ${token}`)
           }
           console.log('headers',headers,'endpoints',endpoints)
           return headers;
        }
    }),
    tagTypes:[],
    endpoints:(builder)=>({}),
 })