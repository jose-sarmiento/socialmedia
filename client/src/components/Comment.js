import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import Reply from './Reply';
import PopupReactions from './PopupReactions';
import ReactionPreviews from './ReactionPreviews';

import { useSelector, useDispatch } from "react-redux";
import { reactComment, updateReactComment } from "../store/posts";

import img from "../assets/img/profiles/d1.jpg";

const Comment = props => {
    const { comment, postId } = props;
    const [isShowing, setIsShowing] = useState(false);
    const [reactionPreviews, setReactionPreviews] = useState([]);
    const [userReaction, setUserReaction] = useState();

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        setUserReaction(
            comment.reactions.find(curr => curr.userId === auth.user._id)
        );
        setReactionPreviews(() => getUniqueReactions(comment.reactions));
    }, [comment.reactions]);

    const getUniqueReactions = reactions => {
        const allReactions = reactions.map(i => i.reaction);
        const distinct = [...new Set(allReactions)];
        const newArr = distinct.map(react => {
            const count = allReactions.filter(item => item === react).length;
            return { count, react };
        });
        return newArr.sort((a, b) => (a.count > b.count ? 1 : -1));
    };

    const handleReactSelect = async value => {
        if (userReaction) dispatch(updateReactComment(postId, comment._id, value));
        else dispatch(reactComment(postId, comment._id, value));
    };

    return (
        <div className='comment'>
            <img
                src={comment.userProfileImage}
                className='comment__commenter-image'
                alt='test'
            />
            <div className='comment__right-wrapper'>
                <div className='comment__contents'>
                    <h4 className='comment__commenter-name'>
                        {comment.userName}
                    </h4>
                    <p className='comment__body'>{comment.comment}</p>

                    {/* <span className="comment__reactions-count">9</span> */}
                    {comment.reactions.length > 0 && (
                        <ReactionPreviews
                            reactionPreviews={reactionPreviews}
                            reactions={comment.reactions}
                            inComment={true}
                        />
                    )}
                </div>

                <div className='comment__actions'>
                    <button
                        className={
                            userReaction
                                ? `comment__btn comment__btn--${userReaction}`
                                : 'comment__btn'
                        }
                        onClick={() => setIsShowing(prev => !prev)}
                        style={{ position: 'relative' }}
                    >
                        Like
                        <PopupReactions
                            isShowing={isShowing}
                            select={handleReactSelect}
                        />
                    </button>
                    <button className='comment__btn'>Reply</button>
                    <span className='comment__passby'>
                        {moment(comment.createdAt).fromNow(true)}
                    </span>
                </div>

                <div className="replies">
                    <Reply />
                    <Reply />
                </div>
            </div>

            
        </div>
    );
};

export default Comment;
