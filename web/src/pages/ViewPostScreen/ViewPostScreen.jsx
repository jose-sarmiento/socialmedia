import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Post, Comment, SkeletonLoading } from '../../components';

import {
  getPost,
  createComment,
  reactComment,
  createReply,
  deletePostReset,
} from '../../store/posts';
import { AppLayout } from '../../container';

import './ViewPostScreen.scss';

function ViewPostScreen() {
  const { id } = useParams();
  const [input, setInput] = useState('');
  const [comment, setComment] = useState();
  const [activeInput, setActiveInput] = useState('comment');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { state: locationState } = useLocation();

  const posts = useSelector((state) => state.entities.posts);
  const { post, loading, success } = posts;

  useEffect(() => {
    if (success.delete) {
      navigate(-1);
      dispatch(deletePostReset());
    }
  }, [success.delete, navigate, dispatch]);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (locationState && locationState.focusCommentInput) {
      inputRef.current.focus();
      window.history.replaceState({}, document.title);
    }
  }, [locationState]);

  const handleCommentClick = () => {
    inputRef.current.focus();
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (input === '') return;

    if (activeInput === 'comment') {
      dispatch(createComment(post._id, input));
    } else {
      dispatch(createReply(post._id, comment._id, input));
      setActiveInput('comment');
    }
    setInput('');
  }

  const handleCommentReact = (commentId, commenter) => {
    dispatch(reactComment(post._id, commenter, commentId));
  };

  const handleReplyClick = (value) => {
    setActiveInput('reply');
    setComment(value);
    inputRef.current.focus();
  };

  return (
    <AppLayout>
      <div className="post-container">
        <div className="post-container__header">
          <BiArrowBack onClick={() => navigate(-1)} />
          <h2>
            Viewing {" "}
            {post?.author.firstname}
            &apos;s Post
          </h2>
        </div>
        <div className="post-container__inner-wrapper">
          {loading.get && <SkeletonLoading />}
          {post && (
            <Post post={post} wide handleCommentClick={handleCommentClick} />
          )}
          {!loading.get && <div className="comment-form">
            <form className="comment-form__form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={
                  activeInput === 'comment'
                    ? 'Write a comment...'
                    : 'Write a reply'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={inputRef}
              />
              <button
                type="submit"
                className={loading.createComment ? 'loading' : ''}
                disabled={input === ''}
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>}

          {!loading.get && <h4 className="post-container__comments-header">Comments {post?.meta.comments > 0 && <span>({post.meta.comments})</span>}</h4>}
          <div className="post-comments">
            {post?.comments.length === 0 && (
              <div className="post-comments__no-comments">
                <span>Be the first to comment in Your Post</span>
              </div>
            )}

            {post?.comments.map((value) => (
              <Comment
                comment={value}
                postId={post?._id}
                key={uuidv4()}
                reactComment={handleCommentReact}
                handleReplyClick={handleReplyClick}
              />
            ))}
          </div>
          
        </div>
      </div>
    </AppLayout>
  );
}

export default ViewPostScreen;
