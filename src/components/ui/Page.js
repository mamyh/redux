import React from 'react';
import { useDispatch } from 'react-redux';
import { changedPage } from '../../features/transactions/transactionsSlice';


const Page = ({currentPage,number}) => {
  const dispatch =useDispatch();
  const style = currentPage ===number+1 ? "p-current" : "p-other";
  
  
  const handleClick =()=>{
    dispatch(changedPage(number+1))
  }
  return (
               <div className={style} onClick={handleClick}>
                    {number+1}
                </div>
  )
}

export default Page