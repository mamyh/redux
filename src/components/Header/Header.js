import React from 'react'
import LeftHeader from './LeftHeader'
import RightHeader from './RightHeader'

const Header = () => {
  return (
    <div className='container custom-container'>
        <LeftHeader />
        <RightHeader />
    </div>
  )
}

export default Header