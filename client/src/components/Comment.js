import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import Reply from './Reply';
import PopupReactions from './PopupReactions';
import ReactionPreviews from './ReactionPreviews';

import { useAuthContext } from '../contexts';

const Comment = props => {
    const { comment, postId } = props;
    const [isShowing, setIsShowing] = useState(false);
    const [reactions, setReactions] = useState([]);
    const [reactionPreviews, setReactionPreviews] = useState([]);
    const [userReaction, setUserReaction] = useState();
    const [loadingReact, setLoadingReact] = useState(false);
    const [errorReact, setErrorReact] = useState(false);

    const { auth } = useAuthContext();

    useEffect(() => {
        if (!comment.reactions) return;

        setReactions(
            comment.reactions.map(curr => ({
                id: curr.userId,
                name: curr.userName,
                reaction: curr.reaction,
            }))
        );
    }, []);

    useEffect(() => {
        setUserReaction(() => {
            const _ = reactions.find(curr => curr.id === auth._id);
            return _ ? _.reaction : undefined;
        });

        setReactionPreviews(() => {
            const allReactions = reactions.map(i => i.reaction);
            const distinct = [...new Set(allReactions)];
            const newArr = distinct.map(react => {
                const count = allReactions.filter(
                    item => item === react
                ).length;
                return { count, react };
            });
            return newArr.sort((a, b) => (a.count > b.count ? 1 : -1));
        });
    }, [reactions]);

    const handleReactSelect = async value => {
        setLoadingReact(true);
        const type = userReaction ? 'put' : 'post';
        try {
            const { data } = await axios[type](
                `${process.env.REACT_APP_API_ENDPOINT}/posts/${postId}/comments/${comment._id}/likes`,
                { reaction: value },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );
            setReactions(() => {
                const updatingComment = data.post.comments.find(
                    el => el._id === comment._id
                );
                return updatingComment.reactions.map(idx => ({
                    id: idx.userId,
                    name: idx.userName,
                    reaction: idx.reaction,
                }));
            });
            setLoadingReact(false);
        } catch (error) {
            setLoadingReact(false);
            setErrorReact(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
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

                    {/*<span className="comment__reactions-count">9</span>*/}
                    {reactions.length > 0 && (
                        <ReactionPreviews
                            reactionPreviews={reactionPreviews}
                            reactions={comment.reactions}
                            inComment={true}
                        />
                    )}
                    {/* <div className="comment__reactions post__reacts">
            <div className="post__react post__react--small  post__react--heart">
              <FaHeart className="post__react-icon post__react-icon--small" />
            </div>
            <div className="post__react post__react--small  post__react--like">
              <FaThumbsUp className="post__react-icon post__react-icon--small" />
            </div>
            <div className="post__react post__react--small  post__react--laugh">
              <FaSurprise className="post__react-icon post__react-icon--small" />
            </div>
          </div>
          */}
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
            </div>

            {/*      <div className="comment__header">
        <div className="comment__commenter-details">
          <span className="comment__passby">{moment(comment.createdAt).fromNow(true)}</span>
        </div>
      </div>

      <div className="comment__body">
      </div>*/}

            {/*    {comment.replies.length > 1 && (
        <span className="comment__view-all">
          {`View all ${comment.replies.length} replies`}
        </span>
      )}

      {comment.replies.length > 0 && (
        <div className="reply-preview">
          <img src={comment.replies[0].userProfileImage} className='reply-preview__img' />
          <h4 className="reply-preview__name">{comment.replies[0].userName}</h4>
          <p className="reply-preview__reply">{comment.replies[0].reply}</p>
        </div>
      )}*/}
        </div>
    );
};

export default Comment;
