import React from 'react';
import { useDispatch } from 'react-redux';
import { changedPages } from '../../features/videos/videosSlice';


const Page = ({currentPage,number}) => {
  const dispatch =useDispatch();
  const style = currentPage ===number+1 ? "bg-blue-600 text-white px-4 py-1 rounded-full" : "bg-blue-100 text-blue-600 px-4 py-1 rounded-full";
  
  
  const handleClick =()=>{
    dispatch(changedPages(number+1))
  }
  return (
               <div className={style} onClick={handleClick}>
                    {number+1}
                </div>
  )
}

export default Page