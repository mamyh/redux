import React from 'react'
import VideoGrid from '../grid/VideoGrid'
import Taglists from '../tags/Taglists'
import Pagination from '../ui/Pagination'

const Home = () => {
  return (
    <>
      <Taglists/>
      <VideoGrid />
      <Pagination />
    </>
  )
}

export default Home