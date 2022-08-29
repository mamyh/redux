import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import cancelImage from "../../assets/images/cancel.png";
import deleteTodo from "../../redux/todos/thunk/deleteTodo";
import updateColor from "../../redux/todos/thunk/updateColor";
import updateStatus from "../../redux/todos/thunk/updateStatus";
import updateTodoText from "../../redux/todos/thunk/updateTodoText";

export default function Todo({ todo }) {
    const [todoText, setTodoText] = useState('');
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const { text, id, completed, color } = todo;
     useEffect(()=>{
       setTodoText(text);
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[]);
    const handleTodoText =(e)=>{
        //setShowTodoText("");
        setTodoText(e.target.value);
    }
    
    const handleSubmit =(e)=>{
      e.preventDefault();
      dispatch(updateTodoText(id,todoText));
      setEdit(edit=>!edit);
    }
    const handleEdit=()=>{
        setEdit((edit)=>!edit);
    }
    const handleStatusChange = (todoId) => {
        dispatch(updateStatus(todoId, completed));
    };

    const handleColorChange = (todoId, color) => {
        dispatch(updateColor(todoId, color));
    };

    const handleDelete = (todoId) => {
        dispatch(deleteTodo(todoId));
    };
    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div
                className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                    completed &&
                    "border-green-500 focus-within:border-green-500"
                }`}
            >
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleStatusChange(id)}
                    className="opacity-0 absolute rounded-full"
                />
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

            <div
                className={`select-none flex-1 ${completed && "line-through"}`}
            >
                {edit && <form
                className="flex items-center  rounded-md"
                onSubmit={handleSubmit}
            >
                
                <input className="w-full border  px-4 py-1 bg-white "  value={todoText} onChange={handleTodoText} />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8  bg-no-repeat bg-contain`}
                ></button>
            </form>
                }
                {!edit && text} 
            </div>
            <div className="flex-shrink-0 h-4 w-4 ml-auto cursor-pointer" onClick={handleEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="16" height="16"
viewBox="0 0 172 172"
style={{fill:'#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#000000"><path d="M129.33594,21.75196c-5.33301,0 -10.37207,2.6455 -14.57129,6.80273l-87.21777,86.75586l-14.57129,43.62987l43.62989,-14.52929l0.92383,-0.88183l86.37793,-85.83203c4.15723,-4.19922 6.76074,-9.23828 6.76074,-14.57129c0,-5.33301 -2.60351,-10.37207 -6.76074,-14.57129c-4.19922,-4.15723 -9.23828,-6.80273 -14.57129,-6.80273zM107.79395,50.64258l13.89942,13.94141l-70.88281,70.46289l-20.82812,6.92871l6.9707,-20.87011z"></path></g></g></svg>
            </div>
            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                    color === "green" && "bg-green-500"
                }`}
                onClick={() => handleColorChange(id, "green")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                    color === "yellow" && "bg-yellow-500"
                }`}
                onClick={() => handleColorChange(id, "yellow")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                    color === "red" && "bg-red-500"
                }`}
                onClick={() => handleColorChange(id, "red")}
            ></div>

            <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleDelete(id)}
            />
        </div>
    );
}
