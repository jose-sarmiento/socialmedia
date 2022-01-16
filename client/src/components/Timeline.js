import React from 'react'
import CreatePost from './CreatePost'
import PostList from './PostList'

const Timeline = () => {

  return (
    <div className='timeline'>
      <CreatePost />
      <PostList />
    </div>
  )
} 

export default Timeline