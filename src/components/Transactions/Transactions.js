import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTransactions } from '../../features/transactions/transactionsSlice';
import Loading from '../ui/Loading';
import Pagination from '../ui/Pagination';
import TransactionsItem from './TansactionsItem';

const Transactions = ({isShow}) => {
  const {transactions,isLoading,isError,error,currentPage,currentTransactions} = useSelector(state=>state.transactions);
  const dispatch = useDispatch();
  let content= null;
  
  useEffect(()=>{
    dispatch(fetchTransactions());
    
    
    
  },[dispatch]);
 
  const length = transactions.length - (transactions.length-5);
  if(isLoading) content = <Loading />
  if(!isLoading && isError) content = <div className='error'>some enternal Errors occur .Error is {error}</div>
  if(!isLoading && !isError && transactions?.length > 0 && currentTransactions?.length > 0) content =isShow ?  transactions.slice(-length).map(transaction=><TransactionsItem transaction={transaction} key={transaction.id} />).reverse(): currentTransactions.map(transaction=> <TransactionsItem transaction={transaction} key={transaction.id} />);
  if(!isLoading && !isError && transactions?.length ===0) content =<div>No Transactions are found</div>
  return (
    <>
       

<div className="conatiner_of_list_of_transactions">
{isShow && <p className="second_heading">Your Transactions:</p>}
    <ul className={!isShow ? 'ui':''}>
      {content}
        
    </ul>
    {isShow && <Link to="/" className='btn'>View All</Link>}
    {!isShow &&<Pagination transactions={transactions} currentPage={currentPage}/>}
</div>
    </>
  )
}

export default Transactions