import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { PostPreview } from '..';
import { sharePost, unsetSharePost } from '../../store/posts';
import { closeShareModal } from '../../store/ui';

import './SharePostModal.scss';

function SharePostModal() {
  const [body, setBody] = useState('');
  const [_error, setError] = useState(null);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.entities.posts);
  const { loading, success, postToBeShared } = posts;
  const ui = useSelector((state) => state.ui);

  useEffect(() => {
    if (!success.share) return;
    setBody('');
    dispatch(closeShareModal());
    dispatch(unsetSharePost());
  }, [success.share, dispatch]);

  const handleModalClose = () => {
    dispatch(closeShareModal());
    dispatch(unsetSharePost());
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    if (loading.share) return;

    const data = {
      sharedPost: postToBeShared._id,
      shared: true,
    };
    if (body) data.body = body;

    dispatch(
      sharePost({
        post: data,
        authorName: postToBeShared.author.firstname,
        postId: postToBeShared._id,
      })
    );
  }

  return (
    <AnimatePresence>
      {ui.shareModalIsOpen && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target.classList.contains('modal')) {
              handleModalClose();
            }
          }}
        >
          <div className="modal__body">
            <button
              type="button"
              className="modal__close"
              onClick={handleModalClose}
            >
              &times;
            </button>

            <h2 className="modal__title">
              Share {postToBeShared?.author.firstname}
              &apos;s Post
            </h2>

            <div className="share-post">
              <form className="share-post__form" encType="multipart/form-data">
                {_error && <p className="create-post__error">{_error}</p>}
                <input
                  className="share-post__input"
                  placeholder="Add caption (optional)"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />

                <div className="share-post__progress">
                  {posts.loading.share && <div className="share-post__bar" />}
                </div>
              </form>
            </div>
            <div className="share-post__preview">
              <PostPreview post={postToBeShared} />
            </div>

            <div className="modal__footer">
              <button
                type="button"
                className="modal__action"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="modal__action"
                disabled={loading.share}
                onClick={handleFormSubmit}
              >
                Share now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SharePostModal;
