import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
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
            },
            transformResponse(response,meta){
                const totalMessages = meta.response.headers.get('X-Total-Count');
                const pages = Math.ceil(totalMessages/process.env.REACT_APP_MESSAGES_PER_PAGE);
               
                return {
                    messages:response,
                    page:pages,
                }
            }
        }),
        getMoreMessages:builder.query({
            query:({id,page})=>`/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try{
                   const moreMessages = await queryFulfilled;
                   console.log(moreMessages);
                }catch(err){
                    console.log('error in more messages',err)
                }
            }
        }),
        addMessage:builder.mutation({
            query:(data)=>({
                url:'/messages',
                method:'POST',
                body:data
            }),
            async onQueryStarted(args,{queryFulfilled,dispatch}){
                try{
                  
                   const message = await queryFulfilled;
                  
                   if(message?.data?.id){
                        
                        dispatch(apiSlice.util.updateQueryData("getMessages",args.conversationId.toString(),(draft)=>{
                            
                            return {
                                messages:[...draft.messages,message.data],
                                page:Number(draft?.page)
                            }
                        }))
                   }
                }catch(err){
                    console.log('Error in Adding message in messages',err)
                }
            }
        })
    })
})

export const { useGetMessagesQuery } = messageApi;