import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
            async onCacheEntryAdded(args,{updateCachedData,cacheDataLoaded,cacheEntryRemoved}){
                //create socket 
                const socket =io('http://localhost:9000',{
                    reconnectionDelay:1000,
                    reconnection:true,
                    reconnectionAttempts:10,
                    transports:["websocket"],
                    agent:false,
                    upgrade:false,
                    rejectUnauthorized:false
                });
                try{
                   await cacheDataLoaded;
                   socket.on("message",(data)=>{
                    updateCachedData(draft=>{
                        draft.push(data?.body)
                      })
                   })
                }catch(err){
                   await cacheEntryRemoved();
                   socket.close()
                }
            }
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