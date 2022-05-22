import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { IoChatbubble, IoHeart } from "react-icons/io5"

import { useSelector, useDispatch } from "react-redux";
import { reactComment, updateReactComment } from "../../store/posts";


import "./Comment.scss"
import { FaPlusSquare } from 'react-icons/fa';

const Comment = props => {
    const { comment, postId } = props;

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleReactSelect = async value => {
        // if (userReaction) dispatch(updateReactComment(postId, comment._id, value));
        // else dispatch(reactComment(postId, comment._id, value));
    };

    return (
        <div className='comment'>
            <img
                src={comment.userProfileImage}
                className='comment__commenter-image'
                alt={comment.userName}
            />
            <div className='comment__right-wrapper'>
                <div className='comment__contents'>
                    <div className="comment__header">
                        <h4 className='comment__commenter-name'>
                            {comment.userName}
                        </h4>
                        <span className="middot">&#9679;</span>
                        <span className="post__follow">@{comment.username}</span>
                    </div>
                    <p className='comment__body'>{comment.comment}</p>
                </div>

                <div className='comment__actions'>
                    <div>
                        <IoChatbubble />
                        <span>{comment.meta.replies}</span>
                    </div>
                    <div>
                        <IoHeart />
                        <span>{comment.meta.likes}</span>
                    </div>
                    <span className="middot">&#9679;</span>
                    <span className='comment__ago'>1 hr</span>
                </div>

                <div className="comment__replies">
                    {comment.replies.map(reply => <Reply reply={reply} />)}
                </div>
            </div>


        </div>
    );
};

const Reply = (reply) => {
    return (
        <div className="reply">
            <figure>
                <img
                    src={reply.userProfileImage}
                    className='comment__commenter-image'
                    alt={reply.userName}
                />
            </figure>
            <div className="reply__right">
                <div className="reply__header">
                    <h4 className='comment__commenter-name'>
                        {reply.userName}
                    </h4>
                    <span className="middot">&#9679;</span>
                    <span className="post__follow">@username</span>
                </div>
                <div className="reply__body">{reply.reply}</div>
                <div className="reply__footer">
                    <div>
                        <IoHeart />
                        <span>{reply.meta.likes}</span>
                    </div>
                    <span className="middot">&#9679;</span>
                    <span className='reply__ago'>1 hr</span>
                </div>
            </div>
        </div>
    )
}

export default Comment;
