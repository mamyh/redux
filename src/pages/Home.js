import React from 'react'
import Header from '../components/Header/Header'
import Transactions from '../components/Transactions/Transactions'

const Home = () => {
  return (
    <>
    <Header />
    <div className="main">
      <div className="container custom-container">
        
         <Transactions limit={10} isShow={false} />
      </div>
    </div>
    
    </>
  )
}

export default Home