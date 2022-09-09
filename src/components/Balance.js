import React from 'react';
import { useSelector } from 'react-redux';
import numberWithCommas from '../utilities/numberWithCommas';

const Balance = () => {
  const {transactions} = useSelector(state=>state.transactions);

  const calculateBalance =(transactions)=>{

     let balance =0;
     transactions.forEach((transaction)=>{
         if(transaction.type === 'income'){
        
          balance += Number(transaction.amount);
         }else{
          balance -= Number(transaction.amount);
         }
         
        
     });
     return balance;
  }
  return (
    <div className="top_card">
                        <p>Your Current Balance</p>
                        <h3>
                            <span>৳</span>
                            <span>{numberWithCommas(calculateBalance(transactions))}</span>
                        </h3>
                    </div>
  )
}

export default Balance