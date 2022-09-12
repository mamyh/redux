import React, { useState } from 'react';
import doubleTick from '../../../assets/images/double-tick.png';
import notesIcon from '../../../assets/images/notes.png';
import plusIcon from '../../../assets/images/plus.png';
import { useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation, useGetTodosQuery } from '../../../features/api/apiSlice';
import Error from '../../ui/Error';
import Success from '../../ui/Success';

const Header = () => {
  const [addTodo,{isSuccess,isError,error}] = useAddTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const {data:todos} = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation()
  const [todo, setTodo] = useState('');

  const handleSubmit =(e)=>{
     e.preventDefault();
     addTodo({text:todo,completed:false});
     setTodo('');
  }

  const handleCompleted =()=>{
    todos.forEach(todo=>editTodo({id:todo.id,data:{
        completed:true,
    }}))
  }
  const handleClearCompleted=()=>{
    todos.forEach(todo=>todo.completed && deleteTodo(todo.id));
  }
  
  return (
    <div>
        {isSuccess && <Success message={'todo is successfully added '} />}
        {isError && <Error error={error} />}
        <form
            className="flex items-center bg-gray-100 px-4 py-4 rounded-md" onSubmit={handleSubmit}
        >
            <img
                src={notesIcon}
                className="w-6 h-6"
                alt="Add todo"
            />
            <input
                type="text"
                placeholder="Type your todo"
                className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                value ={todo}
                onChange ={(e)=>setTodo(e.target.value)}
            />
            <button
                type="submit"
                className={`appearance-none w-8 h-8 bg-[url(${plusIcon})] bg-no-repeat bg-contain`}
            ></button>
        </form>

        <ul className="flex justify-between my-4 text-xs text-gray-500">
            <li className="flex space-x-1 cursor-pointer" onClick={handleCompleted}>
                <img
                    className="w-4 h-4"
                    src={doubleTick}
                    alt="Complete"
                />
                <span>Complete All Tasks</span>
            </li>
            <li className="cursor-pointer" onClick={handleClearCompleted}>Clear completed</li>
        </ul>
    </div>
  )
}

export default Header;