import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, Post } from '../components'

import { useDispatch, useSelector } from "react-redux";
import { getPost } from '../store/posts'
import { AppLayout } from '../container';

const ViewPostScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const posts = useSelector(state => state.entities.posts);
    const { post, loading } = posts;

    useEffect(() => {
        dispatch(getPost(id))
    }, [id, useParams])

    console.log(post)

    if (!post) return null

    return (
        <AppLayout>
            {loading.get && <Loader />}
            {post && <Post post={post} isFullscreen={true} />}
        </AppLayout>
    )
}

export default ViewPostScreen
