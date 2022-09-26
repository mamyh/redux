import io from 'socket.io-client';
import { apiSlice } from "../api/apiSlice";
import { messageApi } from "../messages/messageApi";

export const conversationsApi  = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getConverations:builder.query({
            query:(email) => `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
            async onCacheEntryAdded(args,{
                updateCachedData,cacheDataLoaded,cacheEntryRemoved
            }){
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
                   socket.on("conversation",(data)=>{
                      updateCachedData(draft=>{
                        // eslint-disable-next-line eqeqeq
                        const conversation = draft.find(c => c.id == data?.body?.id)
                      if(conversation?.id){
                        
                         conversation.message = data?.body?.message;
                         conversation.timestamp = data?.body?.timestamp;
                      }else{
                        //do nothing
                      }
                      })
                   })
                 }catch(err){
                     await cacheEntryRemoved;
                     socket.close()
                 }
            }
        }),
        getMoreConversations:builder.query({
            query:({email,page})=>`/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
            async onQueryStarted(args,{queryFulfilled,dispatch}){
                try{
                   const moreConversations = await queryFulfilled;
                   dispatch(apiSlice.util.updateQueryData("getConverations",args.email,(draft)=>{
                       return [...draft,...moreConversations]
                   }))
                }catch(err){

                }
            }
        }),
        getConversation:builder.query({
            query:({userEmail,participantEmail})=>`/conversations?participants_like=${userEmail}-${participantEmail}&participants_like=${participantEmail}-${userEmail}`
        }),
        addConversation:builder.mutation({
            query:({sender,data})=>({
                url:'/conversations',
                method:'POST',
                body:data
            }),
            async onQueryStarted(args,{queryFulfilled,dispatch}){
                
                const conversation = await queryFulfilled;
                if(conversation?.data?.id){
                    dispatch(apiSlice.util.updateQueryData("getConverations",args.sender,(draft)=>{
                       return [conversation?.data, ...draft]
                    }))
                    //silently message will added here
                    const senderDetails = conversation?.data?.users.find(user=>user.email === args.sender);
                    const receiverDetails = conversation?.data?.users.find(user=>user.email !== args.sender);
                    dispatch(messageApi.endpoints.addMessage.initiate({
                       conversationId:conversation?.data?.id,
                       timestamp:conversation?.data?.timestamp,
                       sender:senderDetails,
                       receiver:receiverDetails,
                       message:conversation?.data?.message
                    }))
                    
                }
            }
        }),
        updateConversation:builder.mutation({
            query:({id,sender,data})=>({
                url:`/conversations/${id}`,
                method:'PATCH',
                body:data
            }),
            async onQueryStarted(args,{queryFulfilled,dispatch}){
                //optimistic cach update start here (update UI before backend update.. if backend has any error just updo cach update)
                 const patchResult = dispatch(apiSlice.util.updateQueryData("getConverations",args.sender,(draft)=>{
                    // eslint-disable-next-line eqeqeq
                    const draftConversation = draft.find(singleConversation => singleConversation.id == args.id);
                    draftConversation.message = args.data.message;
                    draftConversation.timestamp = args.data.timestamp;
                  }));
                  
                //optimistic cach update end here
               try{
                const conversation = await queryFulfilled;
                if(conversation?.data?.id){
                    //silently message will added here
                    const senderDetails = conversation?.data?.users.find(user=>user.email === args.sender);
                    const receiverDetails = conversation?.data?.users.find(user=>user.email !== args.sender);
                    dispatch(messageApi.endpoints.addMessage.initiate({
                       conversationId:conversation?.data?.id,
                       timestamp:conversation?.data?.timestamp,
                       sender:senderDetails,
                       receiver:receiverDetails,
                       message:conversation?.data?.message
                    }));
                   
                    //pessimistically cach update start 
                    // dispatch(apiSlice.util.updateQueryData("getMessages",args.id.toString(),(draft)=>{
                    //     draft.push(res);
                    // }))
                    //pessimistically cach update end
                }
               }catch(err){
                 patchResult.undo();
               }
            }
        })

    }),
})

export const {useGetConverationsQuery,useGetConversationQuery,useAddConversationMutation,useUpdateConversationMutation} = conversationsApi;