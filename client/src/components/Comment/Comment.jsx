import React, { useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { reactReply } from '../../store/posts';
import { Reply } from '..';

import './Comment.scss';

function Comment(props) {
  const { comment, postId, reactComment, handleReplyClick } = props;
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleReactReply = (replyId) => {
    dispatch(reactReply(postId, comment._id, replyId));
  };

  return (
    <div className="comment">
      <figure className="comment__commenter-image">
        <img src={comment.userProfileImage} alt={comment.userName} />
      </figure>

      <div className="comment__right-wrapper">
        <div className="comment__contents">
          <div className="comment__header">
            <h4
              className={
                comment.userId === auth.user._id
                  ? 'comment__commenter-name color-primary'
                  : 'comment__commenter-name'
              }
            >
              {comment.userName}
            </h4>
            <span className="middot">&#9679;</span>
            <span className="post__follow">@{comment.username}</span>
          </div>
          <p className="comment__body">{comment.comment}</p>
        </div>

        <div className="comment__actions">
          <div>
            <button
              type="button"
              onClick={() => reactComment(comment._id, comment.userName)}
              className={
                comment.reactors.includes(auth.user._id) ? 'colored' : ''
              }
            >
              Like
            </button>
            {comment.meta.likes > 0 && <span>{comment.meta.likes}</span>}
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleReplyClick(comment)}
              className={
                comment.replies.some((x) => x.userId === auth.user._id)
                  ? 'colored'
                  : ''
              }
            >
              Reply
            </button>
            {comment.meta.replies > 0 && <span>{comment.meta.replies}</span>}
          </div>
          <span className="middot">&#9679;</span>
          <span className="comment__ago">
            {moment(comment.createdAt).fromNow(true)}
          </span>
        </div>

        {comment.replies.length > 0 &&
          (expanded ? (
            <div className="comment__replies">
              {comment.replies.map((reply) => (
                <Reply
                  reply={reply}
                  key={reply._id}
                  reactReply={handleReactReply}
                />
              ))}
            </div>
          ) : (
            <button
              type="button"
              className="comment__reply-count"
              onClick={() => setExpanded(true)}
            >
              {comment.meta.replies > 1
                ? `View ${comment.meta.replies} replies`
                : 'View reply'}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Comment;
