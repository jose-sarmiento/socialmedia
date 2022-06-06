import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Post, Comment, SkeletonLoading } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import {
    getPost,
    createComment,
    reactComment,
    createReply,
    deletePostReset
} from "../../store/posts";
import { AppLayout } from "../../container";

import "./ViewPostScreen.scss";

const ViewPostScreen = () => {
    const { id } = useParams();
    const [input, setInput] = useState("");
    const [comment, setComment] = useState();
    const [activeInput, setActiveInput] = useState("comment");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollToRef = useRef();
    const inputRef = useRef();
    const { state } = useLocation();

    const posts = useSelector(state => state.entities.posts);
    const { post, loading, success } = posts;

    useEffect(() => {
        scrollToRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });
    });

    useEffect(() => {
        if (success.delete) {
            navigate(-1)
            dispatch(deletePostReset())
        }

    },[success.delete])

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, useParams]);

    useEffect(() => {
        console.log(state);
        if (state && state.focusCommentInput) {
            inputRef.current.focus();
            // inputRef.current.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState({}, document.title);
        }
    }, [state]);

    function handleCommentClick() {
        inputRef.current.focus();
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input === "") return;

        if (activeInput === "comment") {
            dispatch(createComment(post._id, input));
        } else {
            dispatch(createReply(post._id, comment._id, input));
            setActiveInput("comment");
        }
        setInput("");
    }

    function handleCommentReact(commentId, commenter) {
        dispatch(reactComment(post._id, commenter, commentId));
    }

    function handleReplyClick(comment) {
        setActiveInput("reply");
        setComment(comment);
        inputRef.current.focus();
    }

    return (
        <AppLayout>
            <div className="post-container">
                <div className="post-container__header">
                    <BiArrowBack onClick={() => navigate(-1)} />
                    <h2>Viewing {post?.author.firstname}'s Post</h2>
                </div>
                <div className="post-container__inner-wrapper">
                    {loading.get && <SkeletonLoading />}
                    {post && (
                        <Post
                            post={post}
                            wide={true}
                            handleCommentClick={handleCommentClick}
                        />
                    )}

                    <h4 className="post-container__comments-header">
                        Comments
                    </h4>
                    <div className="post-comments">
                        {post?.comments.length === 0 && (
                            <div className="post-comments__no-comments">
                                <span>
                                    Be the first to comment in Your Post
                                </span>
                            </div>
                        )}

                        {post?.comments.map((comment, idx) => (
                            <Comment
                                comment={comment}
                                postId={post?._id}
                                key={idx}
                                reactComment={handleCommentReact}
                                handleReplyClick={handleReplyClick}
                            />
                        ))}
                        <span ref={scrollToRef}></span>
                    </div>
                    <div className="comment-form">
                        <h6>
                            {activeInput === "comment"
                                ? `Write comment in ${post?.author.firstname}'s post`
                                : `Write reply on ${comment?.userName} comment`}
                        </h6>
                        <form
                            className="comment-form__form"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder={
                                    activeInput === "comment"
                                        ? "Write a comment..."
                                        : "Write a reply"
                                }
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                ref={inputRef}
                            />
                            <button
                                type="submit"
                                className={
                                    loading.createComment ? "loading" : ""
                                }
                                disabled={input === ""}
                            >
                                <FaPaperPlane />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ViewPostScreen;
