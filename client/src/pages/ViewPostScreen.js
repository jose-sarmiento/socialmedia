import React, { useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { FaCamera, FaHeart, FaLaugh, FaThumbsUp, FaPaperPlane } from 'react-icons/fa'
import { Header, LeftSide, Messenger, Loader, Post }from '../components'
import { getPost } from '../contexts/actions/postActions'

import { usePostsContext, useAuthContext } from '../contexts'

const ViewPostScreen = () => {
  const { id } = useParams()

  const { auth } = useAuthContext()
  const { post, loadingGet, dispatch: postsDispatch } = usePostsContext()

  useEffect(() => {
  	getPost({postId: id, token: auth.token})(postsDispatch)
  }, [id, useParams])

  console.log(post)

  if (!post) return null

  return (
  	<>
  	<div className='main-container container'>
			<Header />
			<LeftSide />
			<div className='middle-content'>
		  	{ loadingGet && <Loader /> }
		    { post && <Post post={post} isFullscreen={true}/> }
		  </div>

			<Messenger />
		</div>
    </>
  )
}

export default ViewPostScreen
