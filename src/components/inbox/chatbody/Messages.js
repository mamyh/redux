import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({messages=[]}) {
    const {user} = useSelector(state=> state.auth) ||{};
    const {email} = user ||{}

    
    return (
        <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
            <ul className="space-y-2">
                <InfiniteScroll
                    dataLength={messages?.length}
                    next={()=>console.log('fetching')}
                    hasMore={false}
                >
                    {messages.slice().sort((a,b)=> a.timestamp - b.timestamp).map(message=>{
                    const {sender,message:lastMessage} = message||{};
                    const justify = sender.email === email ? 'end':'start';
                    return <Message justify={justify} key={Math.random()} message={lastMessage} />
                    })}

                </InfiniteScroll>
                
                 
            </ul>
        </div>
    );
}
