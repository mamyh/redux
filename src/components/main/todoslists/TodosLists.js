import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTodosQuery } from '../../../features/api/apiSlice';
import Error from '../../ui/Error';
import DescriptionLoader from '../../ui/loaders/DescriptionLoader';
import TodoItem from './TodoItem';

const TodosLists = () => {
  const {data:todos,isLoading,isError,error} = useGetTodosQuery();
  const {status,colors} = useSelector(state => state.filters);


  const statusFilter =(todos)=>{
     switch(status){
        case 'Incomplete': return todos.filter(todo=> !todo.completed);
        case 'Complete': return todos.filter(todo=> todo.completed);
        default: return todos;
     }
  }

  const colorsFilter = (todos)=>{
    if(colors.length === 0) return todos;
    return todos.filter(todo=>colors.includes(todo.color))
  }

  //console.log( typeof statusFilter(colorsFilter(todos)));
  let content = null;
  if(isLoading) content =<DescriptionLoader />
  if(!isLoading && isError) content = <Error error={error} />
  if(!isLoading && !isError && todos?.length ===0) content = <Error error={'no todos found'}/>
  if(!isLoading && !isError && todos?.length > 0) content = statusFilter(colorsFilter(todos)).map(todo=> <TodoItem key={Math.random()} todo={todo} />
  );
  return (
  
    <div
        className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto"
    >
      {content}
    </div>
  )
}

export default TodosLists