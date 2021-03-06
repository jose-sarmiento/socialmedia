import React, { useEffect, useState, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Post, SkeletonLoading } from '../../components';
import useFetch from '../../hooks/useFetch';
import { listMyPostsSuccess, listMyPostsReset } from '../../store/posts';

import './Newsfeed.scss';

function Newsfeed({ userId }) {
  const [page, setPage] = useState(1);

  const posts = useSelector((state) => state.entities.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listMyPostsReset());
  }, [dispatch]);

  const { loading, hasNext } = useFetch(
    `/api/v1/users/${userId}/posts`,
    page,
    10,
    listMyPostsSuccess
  );

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasNext]
  );

  const handleCommentClick = (postId) => {
    navigate(`/posts/${postId}`, { state: { focusCommentInput: true } });
  };

  return (
    <div className="section-container newsfeed">
      <div className="section-container__header">
        <h4>Newsfeed</h4>
      </div>

      <div className="section-container__body">
        {posts.myPosts.map((post, index) => {
          let ref = null;
          if (posts.myPosts.length === index + 1) {
            ref = lastElementRef;
          }
          return (
            <Post
              ref={ref}
              post={post}
              key={uuidv4()}
              handleCommentClick={handleCommentClick}
            />
          );
        })}

        {loading && <SkeletonLoading count={3} />}
      </div>
    </div>
  );
}

export default Newsfeed;
