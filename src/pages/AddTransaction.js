import React from 'react'
import Balance from '../components/Balance'
import Form from '../components/Form'
import Layouts from '../components/Layouts'
import Transactions from '../components/Transactions/Transactions'

const AddTransaction = () => {
  return (
    <Layouts >
            <Balance />
            <Form />
            <Transactions  isShow={true}/>
        </Layouts>
  )
}

export default AddTransaction;