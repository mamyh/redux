import React from 'react'
import VideoGrid from '../grid/VideoGrid'
import Taglists from '../tags/Taglists'

const Home = () => {
  return (
    <>
      <Taglists/>
      
      <VideoGrid />
      {/* <Pagination /> */}
    </>
  )
}

export default Home