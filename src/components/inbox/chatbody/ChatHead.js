import getAvatar from "gravatar-url";
import { useSelector } from "react-redux";

export default function ChatHead({ message}) {
    const {user} = useSelector(state=>state.auth)||{};
    const {email} = user ||{};
    const {sender,reciver} = message ||{}
    const partnar = sender.email === email ?reciver : sender;

    return (
        <div className="relative flex items-center p-3 border-b border-gray-300">
            <img
                className="object-cover w-10 h-10 rounded-full"
                src={getAvatar(partnar.email,{
                    size:80
                })}
                alt={partnar.name}
            />
            <span className="block ml-2 font-bold text-gray-600">{partnar.name}</span>
        </div>
    );
}
