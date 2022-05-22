import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, Post, Comment } from '../../components'

import { useDispatch, useSelector } from "react-redux";
import { getPost } from '../../store/posts'
import { AppLayout } from '../../container';

import "./ViewPostScreen.scss"

const ViewPostScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const posts = useSelector(state => state.entities.posts);
    const { post, loading } = posts;

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, useParams])

    if (!post) return null

    return (
        <AppLayout>
            <div className="post-container">
                {loading.get && <Loader />}
                {post && <Post post={post} wide={true} />}

                <div className="post-comments">
                    <h2 className="post-comments__heading">Comments</h2>
                    {post.comments.map((comment, idx) => (
                        <Comment comment={comment} postId={post._id} key={idx} />
                    ))}
                </div>
            </div>

        </AppLayout>
    )
}

export default ViewPostScreen
