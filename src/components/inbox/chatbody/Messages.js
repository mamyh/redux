import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { messageApi } from "../../../features/messages/messageApi";
import Message from "./Message";

export default function Messages({conversationId,pages =1, messages=[]}) {
    const {user} = useSelector(state=> state.auth) ||{};
    const {email} = user ||{}
    const [myPage, setMyPage] = useState(1);
    const dispatch = useDispatch();
    const [hasScroll, setHasScroll] = useState(true)
    
    const nextPage =()=>{
        setMyPage(prevPage => prevPage +1);
    }

    useEffect(()=>{
        console.log('page',myPage);
      if(pages >  myPage){
        setHasScroll(true);
        dispatch(messageApi.endpoints.getMoreMessages.initiate({id:conversationId,page:myPage}))
      }else{
        setHasScroll(false)
      }
    },[myPage,pages,dispatch,conversationId]);
    
    return (
        <div id="scrollableDiv" className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
            <InfiniteScroll
                    dataLength={messages?.length}
                    next={nextPage}
                    hasMore={hasScroll}
                    height={window.innerHeight-197}
                    inverse={true}
                    style={{display:"flex",flexDirection:"column-reverse"}}
                    scrollableTarget="scrollableDiv"
                >
                    <ul className="space-y-2">
                        
                            {messages.slice().sort((a,b)=> a.timestamp - b.timestamp).map(message=>{
                            const {sender,message:lastMessage} = message||{};
                            const justify = sender.email === email ? 'end':'start';
                            return <Message justify={justify} key={Math.random()} message={lastMessage} />
                            })}

                        
                        
                        
                    </ul>
            </InfiniteScroll>
        </div>
    );
}
