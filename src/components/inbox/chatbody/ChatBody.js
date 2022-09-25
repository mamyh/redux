// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messageApi";
import Error from "../../ui/Error";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
    const {id} =useParams();
    const {data:messages,isLoading,isError,error}=useGetMessagesQuery(id);

    let content = null;
    if(!isLoading){ content = <div className="m-3 p-3">Loading ...</div> }
    if(!isLoading && isError ) content = <Error message={error} />
    if(!isLoading && !isError && messages?.length ===0) content = <Error message={error} />
    if(!isLoading && !isError && messages?.length > 0 ) content=<><ChatHead
                                                                        message={messages[0]}
                                                                    />
                                                                    <Messages messages={messages}/>
                                                                    <Options info={messages[0]}/> </>
    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                {content}
                {/* <Blank /> */}
            </div>
        </div>
    );
}
