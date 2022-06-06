import React from 'react'
import moment from "moment"
import { useSelector } from "react-redux"

import "./Reply.scss"

const Reply = ({ reply, reactReply }) => {
	const auth = useSelector(state => state.auth);
	
    return (
        <div className="reply">
            <figure>
                <img
                    src={reply.userProfileImage}
                    className="comment__commenter-image"
                    alt={reply.userName}
                />
            </figure>
            <div className="reply__right">
                <div className="reply__content">
                    <div className="reply__header">
                        <h4 className={reply.userId === auth.user._id ? "comment__commenter-name color-primary" : "comment__commenter-name"}>
                            {reply.userName}
                        </h4>
                        <span className="middot">&#9679;</span>
                        <span className="post__follow">@{reply.username}</span>
                    </div>
                    <div className="reply__body">{reply.reply}</div>
                </div>
                <div className="reply__footer">
                    <div>
                        <span onClick={() => reactReply(reply._id)}>Like</span>
                        {reply.meta?.likes > 0 && (
                            <span>{reply.meta?.likes}</span>
                        )}
                    </div>
                    <span className="middot">&#9679;</span>
                    <span className="reply__ago">
                        {moment(reply.createdAt).fromNow(true)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Reply