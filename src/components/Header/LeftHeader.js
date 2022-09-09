import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../features/transactions/transactionsSlice';

const LeftHeader = () => {
  const {type} = useSelector(state=>state.transactions);
  const [localType, setLocalType] = useState(type);
   const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(fetchTransactions({type:localType}))
  },[dispatch,localType,type]);

  return (
       <div className="form-group radio">
                            <div className="radio_group">
                                <input
                                    type="radio"
                                    value={localType}
                                    onChange={()=>setLocalType('income')}
                                    name="transaction_localType"
                                    checked ={localType === 'income'}
                                />
                                <label>Income</label>
                            </div>
                            <div className="radio_group">
                                <input
                                    type="radio"
                                    value={localType}
                                    onChange={()=>setLocalType('expense')}
                                    name="transaction_localType"
                                    checked ={localType === 'expense'}
                                />
                                <label>Expense</label>
                            </div>
                            <div className="radio_group">
                                <input
                                    type="radio"
                                    value={localType}
                                    onChange={()=>setLocalType('')}
                                    name="transaction_localType"
                                    checked ={localType === ''}
                                />
                                <label>All</label>
                            </div>
                        </div>

  )
}

export default LeftHeader