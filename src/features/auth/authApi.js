import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        //endsPoints here
        register:builder.mutation({
            query:(data)=>({
                url:'/register',
                method:"POST",
                body:data,
            }),
             async onQueryStarted(arg,{queryFulfilled,dispatch}){
                 try{
                     const result = await queryFulfilled;
                     //storage the data to localstorage
                     localStorage.setItem('auth',JSON.stringify({
                        accessToken:result.data.accessToken,
                        user:result.data.user,
                     }));
                     dispatch(userLoggedIn(result.data));
                 }catch(err){
                   console.log('error is ', err);
                 }
             }
        }),
        login:builder.mutation({
            query:(data)=>({
                url:'/login',
                method:"POST",
                body:data
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled;
                    //storage data to the localStorage
                    localStorage.setItem('auth',JSON.stringify({
                        accessToken:result.data.accessToken,
                        user:result.data.user
                    }));
                    dispatch(userLoggedIn(result.data));
                }catch(err){
                    console.log('error from login', err);
                }
            }
        })
    }),
});
export const {useRegisterMutation,useLoginMutation}  = authApi