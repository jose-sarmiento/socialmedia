import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { ProgressBar, PostPreview } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { sharePost, unsetSharePost } from "../../store/posts";
import { closeShareModal } from "../../store/ui";

import "./SharePostModal.scss";

const SharePostModal = () => {
    const [body, setBody] = useState("");
    const [_error, setError] = useState(null);

    const dispatch = useDispatch();
    const users = useSelector(state => state.entities.users);
    const { user } = users;
    const posts = useSelector(state => state.entities.posts);
    const { loading, success, error, postToBeShared } = posts;
    const ui = useSelector(state => state.ui);

    useEffect(() => {
        if (!success.share) return;
        clearFields();
        handleModalClose();
    }, [success.share]);

    function handleModalClose() {
        // reset state
        dispatch(closeShareModal());
        dispatch(unsetSharePost())
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        setError(null);
        if (loading.share) return;

        const data = {
            sharedPost: postToBeShared._id,
            shared: true,
        };
        if (body) data.body = body;

        dispatch(sharePost({
            post: data, 
            authorName: postToBeShared.author.firstname, 
            postId: postToBeShared._id
        }));
    }

    function clearFields() {
        setBody("");
    }

    return (
        <AnimatePresence>
            {ui.shareModalIsOpen && (
                <motion.div
                    className="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={e => {
                        if (e.target.classList.contains("modal")) {
                            handleModalClose();
                        }
                    }}
                >
                    <div className="modal__body">
                        <button
                            className="modal__close"
                            onClick={handleModalClose}
                        >
                            &times;
                        </button>

                        <h2 className="modal__title">
                            Share {postToBeShared?.author.firstname}'s Post
                        </h2>

                        <div className="share-post">
                            <form
                                className="share-post__form"
                                encType="multipart/form-data"
                            >
                                <input
                                    className="share-post__input"
                                    placeholder="Add caption (optional)"
                                    value={body}
                                    onChange={e => setBody(e.target.value)}
                                />

                                <div className="share-post__progress">
                                    {posts.loading.share && (
                                        <div className="share-post__bar"></div>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="share-post__preview">
                            <PostPreview post={postToBeShared} />
                        </div>

                        <div className="modal__footer">
                            <button
                                className="modal__action"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </button>
                            <button
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
};

export default SharePostModal;
