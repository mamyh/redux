import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTransactions, setSearch, setType } from '../../features/transactions/transactionsSlice';

const RightHeader = () => {
  const {search} = useSelector(state=>state.transactions);
  const [localSearch, setLocalSearch] = useState(search);
  const dispatch = useDispatch();

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(setSearch(localSearch));
    dispatch(fetchTransactions({search:localSearch,limit:10}));
  }

  const handleReset =()=>{
      dispatch(setSearch(''));
      dispatch(setType(''));
      dispatch(fetchTransactions({limit:10}));
  }
  return (
    <>
      <form   onSubmit={handleSubmit}>
        <div className="form-group">
                              <input
                                  type="text"
                                  required
                                  name="transaction_Search"
                                  placeholder="Search Transactions"
                                  value={localSearch}
                                  onChange={(e)=>setLocalSearch(e.target.value)}
                              />
                          </div>
                  
      </form>
      <button onClick={handleReset} className="custom-btn">Reset search</button>
      <Link to="/transactions" className='custom-btn color-green'>Add Transaction</Link>
    
    </>
  )
}

export default RightHeader