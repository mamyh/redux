import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({pages =1, messages=[]}) {
    const {user} = useSelector(state=> state.auth) ||{};
    const {email} = user ||{}
    
    console.log(messages.length)
    
    return (
        <div id="scrollableDiv" className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
            <InfiniteScroll
                    dataLength={messages?.length}
                    next={()=>console.log('fetching',pages)}
                    hasMore={true}
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
