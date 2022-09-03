import React from 'react'
import Page from './Page'

const Pagination = ({videos=[],currentPage}) => {
 
  const totalPageNumber=Math.ceil(videos?.length /4)
  
  return (
    <section className="pt-12">
            <div
                className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end"
            >
                {Array.from(Array(totalPageNumber)).map((_,index)=><Page currentPage={currentPage} number={index} key={Math.random()} />)}
                
            </div>
        </section>

  )
}

export default Pagination