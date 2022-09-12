import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTodosQuery } from '../../../features/api/apiSlice';
import { changeStatus, newColor, removeColor } from '../../../features/filters/filtersSlice';

const Footer = () => {
  const {status,colors}=  useSelector(state=>state.filters);
  const {data:todos,isSuccess} = useGetTodosQuery()
  const dispatch = useDispatch();
  
  const todosLeft =(todos) =>{
    const numberOfIncompletetodo =todos.filter(todo =>!todo.completed).length
    switch(numberOfIncompletetodo){
        case 1: return '1 task left';
        case 2 : return '2 tasks left';
        default: return numberOfIncompletetodo +' tasks left';
    }
  }
  
 const  handleStatus =(status)=>{
     dispatch(changeStatus(status));
  }

  const handleColors=(color)=>{
    if(!colors.includes(color)){
       dispatch(newColor(color));
    }else{
        
        dispatch(removeColor(color))
    }
  }
  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
        <p>{isSuccess && todosLeft(todos)}</p>
        <ul className="flex space-x-1 items-center text-xs">
            <li className={`cursor-pointer ${status === 'All' && 'font-bold'}`} onClick={()=>handleStatus('All')}>All</li>
            <li>|</li>
            <li className={`cursor-pointer ${status === 'Incomplete' && 'font-bold'}`} onClick={()=>handleStatus('Incomplete')}>Incomplete</li>
            <li>|</li>
            <li className={`cursor-pointer ${status === 'Complete' && 'font-bold'}`} onClick={()=>handleStatus('Complete')}>Complete</li>
            <li></li>
            <li></li>
            <li
               onClick={()=>handleColors('green')} className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${colors.includes('green') &&  'bg-green-500'}`}
            ></li>
            <li
               onClick={()=>handleColors('red')} className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${colors.includes('red') &&  'bg-red-500'}`}
            ></li>
            <li
               onClick={()=>handleColors('yellow')} className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${colors.includes('yellow') &&  'bg-yellow-500'}`}
            ></li>
        </ul>
</div>
  )
}

export default Footer