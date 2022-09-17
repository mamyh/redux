import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export const useAuthCheck=()=>{
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(false)
    useEffect(()=>{
       const result= localStorage?.getItem('auth');
       const data = JSON.parse(result);
       if(data?.accessToken && data?.user){
         dispatch(userLoggedIn(data));
       }
       setAuth(true);
    },[dispatch]);
    return auth;
}