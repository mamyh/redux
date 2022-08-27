import { useState } from "react";
import { useDispatch } from "react-redux";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import { added, allCompleted, clearCompleted } from "../Redux/todos/actions";

export default function Header() {
    const [todoText, setTodoText] = useState('');
    const dispatch = useDispatch();
    
    // let timeoutId ;
    // const debounce=(value)=>{
    //     clearTimeout(timeoutId);
    //     timeoutId = setTimeout(()=>{
    //         setTodoText(value);
    //     },500);
    // }
    const handleInput =(e)=>{
       setTodoText(e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(added(todoText));
        setTodoText('');
    }

    const handleTasks=()=>{
        dispatch(allCompleted())
    }
    const handleClear=()=>{
        dispatch(clearCompleted())
    }
    return (
        <div>
            <form className="flex items-center bg-gray-100 px-4 py-4 rounded-md" onSubmit={handleSubmit}>
                <img src={noteImage} className="w-6 h-6" alt="Add todo" />
                <input
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    value={todoText}
                    onChange={handleInput}
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                ></button>
            </form>

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li className="flex space-x-1 cursor-pointer">
                    <img className="w-4 h-4" src={tickImage} alt="Complete" />
                    <span  onClick={handleTasks}>Complete All Tasks</span>
                </li>
                <li className="cursor-pointer" onClick={handleClear} >Clear completed</li>
            </ul>
        </div>
    );
}
