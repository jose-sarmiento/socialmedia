import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import PostMediasPreview from "./PostMediasPreview";
import ReactButton from "./ReactButton";
import Toast from "./Toast";
import ReactionPreviews from "./ReactionPreviews";
import Comment from "./Comment";
import CircleImage from "./CircleImage";
import Loader from "./Loader";

import { useSelector, useDispatch } from "react-redux";
import { createComment, reactPost } from "../store/posts";
import { useAppContext } from "../contexts";

const maxCount = 200;

const Post = React.forwardRef((props, ref) => {
    const { post, isFullscreen, small } = props;

    const [inputType, setInputType] = useState("comment");
    const [showMore, setShowMore] = useState(false);
    const [reactionPreviews, setReactionPreviews] = useState([]);
    const [userReaction, setUserReaction] = useState();
    const [commentPageNo, seCommentPageNo] = useState(1);
    const [comments, setComments] = useState([]);

    const { toastIsShowing, toastType, toastMessage } = useAppContext();
    const auth = useSelector(state => state.auth);
    const posts = useSelector(state => state.entities.posts);

    const commentInputRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post.comments?.length === 0) return;
        const sortedArr = [...post.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const slice10 = paginate(sortedArr, commentPageNo);
        setComments([...comments, ...slice10]);
    }, [commentPageNo, post.comments]);

    useEffect(() => {
        setUserReaction(
            post.reactions.find(curr => curr.userId === auth.user._id)
        );
        setReactionPreviews(() => getUniqueReactions(post.reactions));
    }, [post.reactions]);

    const getUniqueReactions = reactions => {
        const allReactions = reactions.map(i => i.reaction);
        const distinct = [...new Set(allReactions)];
        const newArr = distinct.map(react => {
            const count = allReactions.filter(item => item === react).length;
            return { count, react };
        });
        return newArr.sort((a, b) => (a.count > b.count ? 1 : -1));
    };

    const paginate = (array, page_number, page_size = 10) => {
        return array.slice(
            (page_number - 1) * page_size,
            page_number * page_size
        );
    };

    const handleCommentAdd = async e => {
        e.preventDefault();
        dispatch(createComment(post._id, commentInputRef.current.value));
        commentInputRef.current.value = "";
    };

    const handlePostReact = async value => dispatch(reactPost(post._id, value));

    if (posts.loading.get) return <Loader />;

    return (
        <>
            {toastIsShowing && <Toast />}
            <div
                className={
                    small
                        ? "post post--small"
                        : isFullscreen
                            ? "post post--big"
                            : "post"
                }
                ref={ref}
            >
                <Link to={`/posts/${post._id}`}>
                    <div className="post__header mb-_5">
                        <figure className="post__user-img">
                            <img
                                src={post.author.profileImage}
                                alt={`${post.author.firstname} ${post.author.lastname}`}
                            />
                        </figure>

                        <h2 className="post__heading">
                            {`${post.author.firstname} ${post.author.lastname} Shared a Story`}
                            <span className="middot">&#9679;</span>
                            <span className="post__follow">Following</span>
                        </h2>

                        <span className="post__time">
                            {moment(post.createdAt).fromNow(true)}
                        </span>
                    </div>
                </Link>

                <div className="post__body">
                    {!isFullscreen && post.multimedia && post.multimedia.length > 0 && (
                        <PostMediasPreview
                            medias={post.multimedia}
                            fullHeight={isFullscreen}
                        />
                    )}
                    
                    {isFullscreen && post.multimedia && post.multimedia.map(post => (
                        <div className="post__image-wrapper post__image-wrapper--full" key={post._id}>
                            <img className="post__image" src={post.path} alt="test" />
                        </div>
                    ))}

                    <div className="post__description">
                        {post.title && (
                            <h2 className="post__title">{post.title}</h2>
                        )}
                        {post.body && isFullscreen ? (
                            <p className="post__caption">{post.body}</p>
                        ) : post.body ? (
                            <p className="post__caption">
                                {showMore
                                    ? post.body
                                    : post.body.split("").length <= maxCount
                                        ? post.body
                                        : `${post.body.substring(0, maxCount)}... `}
                                {post.body.split("").length >= maxCount && (
                                    <span
                                        className="post_show-more"
                                        onClick={() => setShowMore(!showMore)}
                                    >
                                        {showMore ? " show less" : " show more"}
                                    </span>
                                )}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>

                    {(post.reactions.length > 0 ||
                        post.comments.length > 0) && (
                            <div className="post__stats">
                                {post.reactions.length > 0 ? (
                                    <ReactionPreviews
                                        reactionPreviews={reactionPreviews}
                                        reactions={post.reactions}
                                    />
                                ) : (
                                    <span>Be the first to react on this post</span>
                                )}

                                {post.comments.length > 0 && (
                                    <span className="post__comment-counts">
                                        {`${post.comments.length} ${post.comments.length === 1
                                                ? "comment"
                                                : "comments"
                                            }`}
                                    </span>
                                )}
                            </div>
                        )}
                </div>

                {isFullscreen && (
                    <div className="post__comments">
                        {post.comments.length === 0 ? (
                            <p className="post__no-comment">
                                Be first to comment
                            </p>
                        ) : (
                            post.comments.map(comment => (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    postId={post._id}
                                />
                            ))
                        )}
                    </div>
                )}

                <div className="post__footer">
                    <form
                        className="post__comment-form"
                        onSubmit={handleCommentAdd}
                    >
                        <input
                            ref={commentInputRef}
                            type="text"
                            placeholder="Write a comment"
                            className="post__comment-input"
                            required
                        />
                        <button
                            type="submit"
                            className="post__action post__action--plane"
                        >
                            <FaPaperPlane className="post__action-icon post__action--plane" />
                        </button>
                    </form>

                    <ReactButton
                        userReaction={userReaction?.reaction}
                        react={handlePostReact}
                        loading={posts.loading.reactPost}
                    />
                </div>
            </div>
        </>
    );
});

export default Post;
