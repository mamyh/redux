import React from 'react';
import { useDispatch } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';
import { removeTransaction, startEdit } from '../../features/transactions/transactionsSlice';
import numberWithCommas from '../../utilities/numberWithCommas';

const TransactionsItem = ({transaction ={}}) => {
    const {name,type,amount,id} = transaction;
    const dispatch = useDispatch();
    const match =useMatch('/transactinos');
    const navigate = useNavigate()
  
  const handleDelete =()=>{
    dispatch(removeTransaction(id));
  }

  const handleEdit =()=>{
    dispatch(startEdit(transaction));
    if(!match){
      navigate('/transactions');
    }
  }

  return (
    <li className={`transaction ${type === 'income'? "income":"expense"}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {numberWithCommas(Number(amount))}</p>
                <button className="link" onClick={handleEdit}>
                    <img
                        className="icon"
                        src={editIcon}
                        alt="edit icon"
                    />
                </button>
                <button className="link" onClick={handleDelete}>
                    <img
                        className="icon"
                        src={deleteIcon}
                        alt="Delete icon"
                    />
                </button>
            </div>
        </li>
  )
}

export default TransactionsItem