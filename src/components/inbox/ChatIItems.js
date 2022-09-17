import gravatarUrl from "gravatar-url";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConverationsQuery } from "../../features/conversations/conversationsApi";
import { getPartner } from "../../utilities/getPartner";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
    const {user} =useSelector(state=>state.auth)||{};
    const {email} = user || {};
    const {data:conversations,isLoading,isError,error} =useGetConverationsQuery(email);

    let content = null;
    if(isLoading){
        content =<li className="text-center m-2">Loading ...</li>
    }else if(!isLoading && isError){
        content =<li className="text-center m-2"><Error message={error?.data}/></li>
    }else if(!isLoading && !isError && conversations?.length ===0){
        content = <li className="text-center m-2">No Videos found !!</li>
    }else if(!isLoading && !isError && conversations?.length > 0){
        content =conversations.map(conversation=>{
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
        })
    }
    return (
        <ul>
            {content}
        </ul>
    );
}
