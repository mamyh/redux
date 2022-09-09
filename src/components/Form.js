import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, updateTransaction } from '../features/transactions/transactionsSlice';

const Form = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
     const [isEditable, setIsEditable] = useState(false);
    const {isLoading,edited} = useSelector(state=>state.transactions);
    const dispatch = useDispatch();

    useEffect(()=>{
       if( edited?.id){
         setName(edited?.name);
         setAmount(edited?.amount);
         setType(edited?.type);
         setIsEditable(true);
       }
    },[edited]);
   
    const reset=()=>{
        setName('');
        setType('');
        setAmount('');
    }

    const handleEditable=()=>{
        setIsEditable(isEditable=>!isEditable)
        reset();
    }
   
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createTransaction({
            name,type,amount:Number(amount)
        }));
        reset();
    }

    const handleUpdate =(e)=>{
       e.preventDefault();
       dispatch(updateTransaction({id:edited?.id,data:{name,type,amount:Number(amount)}}));
       reset();
       setIsEditable(false);
    }
    
  return (
    <div className="form">
                        <h3>{isEditable ? `Update ${edited?.id} no. transaction` :'Add new transaction'}</h3>
                     <form onSubmit={isEditable? handleUpdate : handleSubmit}>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                required
                                name="transaction_name"
                                placeholder="transaction name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group radio">
                            <label>Type</label>
                            <div className="radio_group">
                                <input
                                    type="radio"
                                    value={type}
                                    required
                                    onChange={()=>setType('income')}
                                    name="transaction_type"
                                    checked ={type === 'income'}
                                />
                                <label>Income</label>
                            </div>
                            <div className="radio_group">
                                <input
                                    type="radio"
                                    value={type}
                                    required
                                    onChange={()=>setType('expense')}
                                    name="transaction_type"
                                    checked ={type === 'expense'}
                                    placeholder="expense"
                                />
                                <label>Expense</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Amount</label>
                            <input
                                type="number"
                                placeholder="amount"
                                name="transaction_amount"
                                required
                                value={amount}
                                onChange={(e)=>setAmount(e.target.value)}
                            />
                        </div>

                         <button className="btn" type="submit" disabled={isLoading}>{isEditable ?'Update Transaction':'Add Transaction'}</button>

                     </form>

                        {isEditable &&<button className="btn cancel_edit" onClick={handleEditable}>Cancel Edit</button>}
                    </div>
  )
}

export default Form