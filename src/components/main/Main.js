import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchTodos from '../../redux/todos/thunk/fetchTodos'
import Footer from './Footer'
import Header from './Header'
import TodoList from './TodoList'

const Main = () => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos);
    }, [dispatch]);
  const incompleteTodos = todos.filter(item=>!item.completed);
  const completeTodos  = todos.filter(item=> item.completed);
  return (
    <div className='my-24'>
        <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
                    <Header />

                    <hr className="mt-4" />

                    <TodoList todos={incompleteTodos} />

                    <hr className="mt-4" />
                      
                    <Footer />
        </div>
        <div className=" my-12 w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
                   

                    <TodoList todos={completeTodos} />

        </div>
    </div>
  )
}

export default Main;