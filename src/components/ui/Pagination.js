import React from 'react'
import Page from './Page'

const Pagination = ({transactions=[],currentPage}) => {
 
  const totalPageNumber=Math.ceil(transactions?.length /10)
  
  return (
    <section className="p-section">
            <div
                className="p-div"
            >
                {Array.from(Array(totalPageNumber)).map((_,index)=><Page currentPage={currentPage} number={index} key={Math.random()} />)}
                
            </div>
        </section>

  )
}

export default Pagination