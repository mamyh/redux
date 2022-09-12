import React, { useState } from 'react';
import deleteIcon from '../../../assets/images/cancel.png';
import { useDeleteTodoMutation, useEditTodoMutation } from '../../../features/api/apiSlice';
import Modal from '../../ui/Modal';

const TodoItem = ({todo={}}) => {
    const [deleteTodo] =useDeleteTodoMutation();
    const [editTodo] = useEditTodoMutation();
    const [isModalShow, setIsModalShow] = useState(false);
    const {text,completed,color,id}= todo;
    // const [checked, setChecked] = useState(completed);
    
    const handleDelete=(id)=>{
        deleteTodo(id);
    }

    const colorTopple =(id,passColor)=>{
        editTodo({id,data:{
            color:passColor
        }});
    }
    const handleEdit=()=>{
       setIsModalShow(true);
    }
    const handleCheckbox=(id)=>{
       editTodo({id,data:{completed:!completed}})
    }
  return (
   
    <div
        className=" relative flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0"
    >
        <div
            className="rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-green-500 focus-within:border-green-500"
        >
            <input
                type="checkbox"
                className="opacity-0 absolute rounded-full"
                onChange={()=>handleCheckbox(id)}
            />
            <svg
                className={`${!completed && 'hidden'} fill-current w-3 h-3 text-green-500 pointer-events-none`}
                viewBox="0 0 20 20"
            >
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
        </div>

        <div className={`select-none flex-1 ${completed && 'line-through'}`}>
            {text}
        </div>
        <div className="flex-shrink-0 h-4 w-4 ml-auto cursor-pointer" onClick={handleEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="16" height="16"
viewBox="0 0 172 172"
style={{fill:'#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#000000"><path d="M129.33594,21.75196c-5.33301,0 -10.37207,2.6455 -14.57129,6.80273l-87.21777,86.75586l-14.57129,43.62987l43.62989,-14.52929l0.92383,-0.88183l86.37793,-85.83203c4.15723,-4.19922 6.76074,-9.23828 6.76074,-14.57129c0,-5.33301 -2.60351,-10.37207 -6.76074,-14.57129c-4.19922,-4.15723 -9.23828,-6.80273 -14.57129,-6.80273zM107.79395,50.64258l13.89942,13.94141l-70.88281,70.46289l-20.82812,6.92871l6.9707,-20.87011z"></path></g></g></svg>
            </div>
        <div onClick={()=>colorTopple(id,'green')}
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${color==='green'?'bg-green-500':''} `}
        ></div>

        <div onClick={()=>colorTopple(id,'yellow')}
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${color==='yellow'?'bg-yellow-500':''}`}
        ></div>

        <div onClick={()=>colorTopple(id,'red')}
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${color==='red'?'bg-red-500':''}`}
        ></div>

        <img
            src={deleteIcon}
            className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
            alt="Cancel"
            onClick={()=>handleDelete(id)}
        />
        {isModalShow && <Modal todo={todo}  handleEdit={handleEdit}/>}
    </div>

    
  )
}

export default TodoItem