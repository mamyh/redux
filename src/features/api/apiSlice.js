 import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';

 const customBaseQuery=fetchBaseQuery({
   baseUrl:process.env.REACT_APP_API_URL,
   prepareHeaders: async(headers,{getState,endpoints})=>{
      const token = getState()?.auth?.accessToken;
      
      if(token){
        headers.set('Authorization',`Bearer ${token}`)
      }
      return headers;
   }
})

 export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:async(args,api,extraOptions)=>{
         const result  = await customBaseQuery(args,api,extraOptions);
         console.log(result);
         if(result?.error?.status === 401){
            api.dispatch(userLoggedOut());
            localStorage.clear();
         }
         return result;
    },
    tagTypes:[],
    endpoints:(builder)=>({}),
 })