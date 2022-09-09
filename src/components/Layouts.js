import React from 'react';

const  Layouts = ({children}) => {
  return (
        
        <div className="main">
            <div className="container">
                {
                    children
                }
            </div>
        </div>
       
  )
}

export default  Layouts;