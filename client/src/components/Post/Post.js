import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import PostMediasPreview from "../PostMediasPreview";
import { IoChatbubble, IoHeart, IoNewspaperOutline } from "react-icons/io5"
import { IoIosShareAlt } from "react-icons/io"
import { FaPaperPlane } from "react-icons/fa"
import { motion } from 'framer-motion/dist/framer-motion'
import { useSelector, useDispatch } from "react-redux";
import SkeletonLoading from "./SkeletonLoading";
import { reactPost } from "../../store/posts";

import "./Post.scss";

const Post = React.forwardRef((props, ref) => {
    const { post, wide } = props;

    const auth = useSelector(state => state.auth);
    const posts = useSelector(state => state.entities.posts);

    const dispatch = useDispatch();

    const handlePostReact = async () => dispatch(reactPost(post._id, post.author.firstname));

    const isAlreadyCommented = () => post.comments.find(comment => comment.userId === auth.user._id);

    if (posts.loading.get) return <SkeletonLoading />;

    return (
        <motion.div 
            className={wide ? "post post--wide" : "post"} 
            ref={ref}
            initial={{ opacity: 0, y: 20, scaleX: .95 }}
            whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
        >
            {!wide && <div className="post__left">
                <Link to={`/users/${post.author._id}`}>
                    <figure className="post__user-img">
                        <img
                            src={post.author.profileImage}
                            alt={`${post.author.firstname} ${post.author.lastname}`}
                        />
                    </figure>
                </Link>
            </div>}

            <div className="post__right">
                <Link to={`/posts/${post._id}`}>
                    <div className="post__header">
                       {wide && <Link to={`/users/${post.author._id}`}>
                            <figure className="post__user-img">
                                <img
                                    src={post.author.profileImage}
                                    alt={`${post.author.firstname} ${post.author.lastname}`}
                                />
                            </figure>
                        </Link>}
                        <h2 className="post__heading">
                            <Link to={`/users/${post.author._id}`}>
                                <span className="post__name">
                                    {`${post.author.firstname} ${post.author.lastname}`}
                                </span>
                            </Link>
                            <span className="middot">&#9679;</span>
                            <span className="post__follow">@{post.author.username}</span>
                        </h2>

                        <span className="post__time">
                            {moment(post.createdAt).fromNow(true)}
                        </span>
                    </div>
                </Link>

                <div className="post__body">

                    <div className="post__description">
                        <p className="post__caption">{post.body}</p>

                        {post.multimedia && post.multimedia.length > 0 && (
                            <PostMediasPreview
                                medias={post.multimedia}
                                fullHeight={wide}
                            />
                        )}
                    </div>
                </div>

                <div className="post__footer">
                    <div className="reactions" onClick={handlePostReact}>
                        <IoHeart className={post.reactors.includes(auth.user._id) && "active"} />
                        <span>{post.meta.likes} likes</span>
                    </div>
                    <div className="comments">
                        <IoChatbubble className={isAlreadyCommented && "active"} />
                        <span>{post.meta.comments} comments</span>
                    </div>
                    <div className="readmore">
                        <IoIosShareAlt />
                        <span>0 shares</span>
                    </div>
                </div>

            </div>
        </motion.div>
    );
});

export default Post;
