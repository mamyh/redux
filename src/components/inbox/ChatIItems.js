import gravatarUrl from "gravatar-url";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { conversationsApi, useGetConverationsQuery } from "../../features/conversations/conversationsApi";
import { getPartner } from "../../utilities/getPartner";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
    const {user} =useSelector(state=>state.auth)||{};
    const {email} = user || {};
   const [hasPage, setHasPage] = useState(true);
   const [page, setPage] = useState(1);
    const {data,isLoading,isError,error} =useGetConverationsQuery(email)||{};
    const {conversations,page:totalPage} = data||{};
    const dispatch = useDispatch();

    
    const fetchMore=()=>{
        setPage(prevPage=>prevPage +1);
    }
    useEffect(()=>{
        if(page > 1){
            dispatch(conversationsApi.endpoints.getMoreConversations.initiate({email,page}));
           }
    },[page,dispatch,email])
    useEffect(()=>{
           if(totalPage > 0 && totalPage > page){
            setHasPage(true);
           }else{
            setHasPage(false);
           }

           
    },[totalPage,page]);
    
    
    
    let content = null;
    
    if(isLoading){
        content =<li className="text-center m-2">Loading ...</li>
    }else if(!isLoading && isError){
        
        content =<li className="text-center m-2"><Error message={error?.data}/></li>
    }else if(!isLoading && !isError && conversations?.length ===0){
        content = <li className="text-center m-2">No Conversation found !!</li>
    }else if(!isLoading && !isError && conversations?.length > 0){
        content =<InfiniteScroll
                    dataLength={conversations?.length} 
                    next={fetchMore}
                    hasMore={hasPage}
                    loader={<h4>Loading...</h4>}
                    height={window.innerHeight -129}
                 >

                    {conversations.map(conversation=>{
                const {id,message,timestamp,users} = conversation;
                
                const {name:partnerName,email:partnerEmail} =getPartner(users,email);
                return (
                    <li key={id}>
                    <Link to={`/inbox/${id}`}>
                        <ChatItem
                            avatar={gravatarUrl(partnerEmail,{
                                size:80
                            })}
                            name={partnerName}
                            lastMessage={message}
                            lastTime={moment(timestamp).fromNow()}
                        /> 
                    </Link>
                </li>
                )
                    })}
               </InfiniteScroll>
    }
    return (
        <ul>
            {content}
        </ul>
    );
}
