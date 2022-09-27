import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conversationsApi, useAddConversationMutation, useUpdateConversationMutation } from "../../features/conversations/conversationsApi";
import { useGetUserQuery } from "../../features/user/userApi";
import { isEmailValid } from "../../utilities/isEmailValid";
import Error from '../ui/Error';

export default function Modal({ open, control }) {
    const [to, setTo] = useState('');
    const {user:userLoggedIn } =useSelector(state=>state.auth)||{};
    const {email:myEmail} = userLoggedIn ||{};
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [needUser, setNeedUser] = useState(false);
    const [conversation, setConversation] = useState(undefined);
    const {data:participant,isError:isParticipantError,error:participantErro} =useGetUserQuery(to,{
        skip:!needUser
    });
    const [addConversation,{isSuccess:isAddConversationSuccess}] = useAddConversationMutation();
    const [updateConversation,{isSuccess:isEditConversationSuccess}] = useUpdateConversationMutation()
   
    
    //listening to the participant
    useEffect(()=>{
        console.log('participant',participant)
       if(participant?.length > 0 && participant[0].email !==myEmail){
        console.log(participant)
        //check conversation exist
          dispatch(conversationsApi.endpoints.getConversation.initiate({userEmail:myEmail,participantEmail: to})).unwrap().then(data=>{
            console.log('data',data,'conversation',conversation)
            setConversation(data)
        }).catch(err=>setEmailError('there is an error from conversations data'));
       }
    },[participant,myEmail,dispatch,to,conversation]);

   //listening to the conversation succession
   useEffect(()=>{
       if(isAddConversationSuccess || isEditConversationSuccess){
        control();
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[isAddConversationSuccess,isEditConversationSuccess])
    
    const debounce=(fn,delay)=>{
        let timeout;
        return (...args)=>{
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
                fn(...args);
            },delay)
        }
    }

    const doSearch=(value)=>{
        setEmailError('');
        if(isEmailValid(value)){
          //call the api here
          
          setTo(value);
          setNeedUser(true);
          return ;
        }
        setEmailError('Email is not valid');
    }
    
    const handleEmail=debounce(doSearch,2000);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(conversation)
        if(conversation?.length > 0 ){
            //edit conversation
            
            updateConversation({id:conversation[0].id,sender:myEmail,data:{
                participants:`${myEmail}-${participant[0].email}`,
                users:[userLoggedIn,participant[0]],
                message,
                timestamp:new Date().getTime()
            }})
        }else if( conversation?.length === 0){
            //add conversation
            addConversation({sender:myEmail,data:{
                
                    participants:`${myEmail}-${participant[0].email}`,
                    users:[userLoggedIn,participant[0]],
                    message,
                    timestamp:new Date().getTime()
                
            }}) 
        }
        setTo('')
        
    }
    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    id="to"
                                    name="to"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Send to"
                                
                                    onChange={(e)=>handleEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e)=>setMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                disabled={conversation === undefined ||(participant?.length > 0 && participant[0].email=== myEmail)}
                            >
                                Send Message
                            </button>
                        </div>

                        {emailError !==''&& <Error message={emailError} />} 
                        {isParticipantError && <Error message={participantErro}/>}
                        {participant?.length === 0 && <Error message="Email doesnot exist !" />}
                        {participant?.length > 0 && participant[0].email=== myEmail && <Error message="You can not chat with yourself!" />}
                    </form>
                </div>
            </>
        )
    );
}
