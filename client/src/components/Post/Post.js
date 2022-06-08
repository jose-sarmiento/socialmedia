import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoNewspaperOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import {
    BiRepost,
    BiTrash,
    BiDotsVerticalRounded,
    BiShare,
    BiChat,
    BiHeart,
    BiErrorCircle,
} from "react-icons/bi";
import { motion } from "framer-motion/dist/framer-motion";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import PostMediasPreview from "../PostMediasPreview";
import SkeletonLoading from "./SkeletonLoading";

import { reactPost, deletePost, setSharePost } from "../../store/posts";
import { showShareModal } from "../../store/ui";

import "./Post.scss";

const Post = React.forwardRef((props, ref) => {
    const { post, wide, handleCommentClick } = props;
    const routes = [{ path: "/users/:id" }];
    const [isOpenOptions, setIsOpenOptions] = useState(false);

    const auth = useSelector(state => state.auth);
    const posts = useSelector(state => state.entities.posts);

    const dispatch = useDispatch();
    const optionsRef = useRef();

    useEffect(() => {
        if (isOpenOptions) {
            optionsRef.current?.focus();
        }
    }, [isOpenOptions]);

    function toggleOptions(e) {
        if (isOpenOptions) return;
        setIsOpenOptions(prev => !prev);
    }

    const closeOptions = e => {
        setIsOpenOptions(false);
    };

    const handlePostReact = async () =>
        dispatch(reactPost(post._id, post.author.firstname));

    const isAlreadyCommented = () =>
        post.comments.find(comment => comment.userId === auth.user._id);

    const handleSharePost = () => {
        if (post.rePosters.includes(auth.user._id)) {
            toast.info(`Post already shared`, {
                autoClose: 3000,
                hideProgressBar: true,
            });
            return;
        }
        const sharedpost = _.omit(post, ["comments", "reactors"]);
        dispatch(setSharePost(sharedpost));
        dispatch(showShareModal(sharedpost));
    };

    if (posts.loading.get) return <SkeletonLoading />;

    return (
        <div className={wide ? "post post--wide" : "post"} ref={ref}>
            {!wide && (
                <div className="post__left">
                    <Link to={`/users/${post.author._id}`}>
                        <figure className="post__user-img">
                            <img
                                src={post.author.profileImage}
                                alt={`${post.author.firstname} ${post.author.lastname}`}
                            />
                        </figure>
                    </Link>
                </div>
            )}

            <div className="post__right">
                {post.shared && (
                    <span className="post__repost">
                        <BiRepost />
                        {`${
                            post.author._id === auth.user._id
                                ? "You"
                                : post.author.firstname
                        } share ${post.sharedPost?.author.firstname || "someone"}'s post`}
                    </span>
                )}
                <div className="post__header">
                    {wide && (
                        <Link to={`/users/${post.author._id}`}>
                            <figure className="post__user-img">
                                <img
                                    src={post.author.profileImage}
                                    alt={`${post.author.firstname} ${post.author.lastname}`}
                                />
                            </figure>
                        </Link>
                    )}
                    <h2 className="post__heading">
                        <Link to={`/users/${post.author._id}`}>
                            <span className="post__name">
                                {`${post.author.firstname} ${post.author.lastname}`}
                            </span>
                        </Link>
                        <span className="middot">&#9679;</span>
                        <span className="post__follow">
                            @{post.author.username}
                        </span>
                    </h2>

                    <span className="post__time">
                        {moment(post.createdAt).fromNow(true)}
                    </span>
                    {post.author._id === auth.user._id && (
                        <span className="post__dots">
                            <BiDotsVerticalRounded
                                title="options"
                                onClick={toggleOptions}
                            />
                            {isOpenOptions && (
                                <div
                                    className="post__options"
                                    tabIndex="1"
                                    onBlur={closeOptions}
                                    ref={optionsRef}
                                >
                                    <div
                                        className="post__option"
                                        onClick={() =>
                                            dispatch(deletePost(post._id))
                                        }
                                    >
                                        <BiTrash />
                                        <span>Delete</span>
                                    </div>
                                </div>
                            )}
                        </span>
                    )}
                </div>

                <div className="post__body">
                    <div className="post__description">
                        <Link to={`/posts/${post._id}`}>
                            <p className="post__caption">{post.body}</p>
                        </Link>
                        {post.multimedia && post.multimedia.length > 0 && (
                            <PostMediasPreview
                                medias={post.multimedia}
                                fullHeight={wide}
                            />
                        )}
                    </div>
                </div>

                {post.shared && post.sharedPost ? (
                    <div className="post__shared">
                        <div className="post__header">
                            <Link to={`/users/${post.sharedPost.author._id}`}>
                                <figure className="post__user-img">
                                    <img
                                        src={
                                            post.sharedPost.author.profileImage
                                        }
                                        alt={`${post.sharedPost.author.firstname} ${post.sharedPost.author.lastname}`}
                                    />
                                </figure>
                            </Link>
                            <h2 className="post__heading">
                                <Link
                                    to={`/users/${post.sharedPost.author._id}`}
                                >
                                    <span className="post__name">
                                        {`${post.sharedPost.author.firstname} ${post.sharedPost.author.lastname}`}
                                    </span>
                                </Link>
                                <span className="middot">&#9679;</span>
                                <span className="post__follow">
                                    @{post.sharedPost.author.username}
                                </span>
                            </h2>

                            <span className="post__time">
                                {moment(post.sharedPost.createdAt).fromNow(
                                    true
                                )}
                            </span>
                        </div>

                        <div className="post__body">
                            <div className="post__description">
                                <Link to={`/posts/${post.sharedPost._id}`}>
                                    <p className="post__caption">
                                        {post.sharedPost.body}
                                    </p>
                                </Link>
                                {post.sharedPost.multimedia &&
                                    post.sharedPost.multimedia.length > 0 && (
                                        <PostMediasPreview
                                            medias={post.sharedPost.multimedia}
                                            fullHeight={wide}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="post__shared">
                        <div className="post__unavailable">
                            <BiErrorCircle />
                            The post is unavailable. The user might deleted this
                            post
                        </div>
                    </div>
                )}

                <div className="post__footer">
                    <div className="reactions" onClick={handlePostReact}>
                        <BiHeart
                            className={
                                post.reactors.includes(auth.user._id) &&
                                "active"
                            }
                        />
                        <span>{post.meta.likes} likes</span>
                    </div>
                    <div
                        className="comments"
                        onClick={() => handleCommentClick(post._id)}
                    >
                        <BiChat
                            className={
                                post.comments.some(
                                    x => x.userId === auth.user._id
                                )
                                    ? "active"
                                    : ""
                            }
                        />
                        <span>{post.meta.comments} comments</span>
                    </div>
                    <div className="readmore" onClick={handleSharePost}>
                        <BiShare
                            className={
                                post.rePosters.includes(auth.user._id)
                                    ? "active"
                                    : ""
                            }
                        />
                        <span>{post.meta.shares} shares</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Post;
