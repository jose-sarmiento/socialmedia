import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import PostMediasPreview from "../PostMediasPreview";
import ReactButton from "../ReactButton";
import ReactionPreviews from "../ReactionPreviews";
import Toast from "../Toast";
import { HiRefresh } from "react-icons/hi"
import { IoChatbubble, IoHeartOutline, IoHeart } from "react-icons/io5"
import { IoIosShareAlt } from "react-icons/io"
import Loader from "../Loader";

import "./Post.scss";

import { useSelector, useDispatch } from "react-redux";
import { createComment, reactPost } from "../../store/posts";
import { useAppContext } from "../../contexts";

const maxCount = 400;

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
            <div className="post" ref={ref}>
                <div className="post__left">
                    <figure className="post__user-img">
                        <img
                            src={post.author.profileImage}
                            alt={`${post.author.firstname} ${post.author.lastname}`}
                        />
                    </figure>
                </div>

                <div className="post__right">
                    <div className="post__header">
                        <h2 className="post__heading">
                            <span className="post__name">
                                {`${post.author.firstname} ${post.author.lastname}`}
                            </span>
                            <span className="middot">&#9679;</span>
                            <span className="post__follow">@username</span>
                        </h2>

                        <span className="post__time">
                            {moment(post.createdAt).fromNow(true)}
                        </span>
                    </div>

                    <div className="post__body">

                        <div className="post__description">
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

                            {!isFullscreen && post.multimedia && post.multimedia.length > 0 && (
                                <PostMediasPreview
                                    medias={post.multimedia}
                                    fullHeight={isFullscreen}
                                />
                            )}
                        </div>
                    </div>

                    <div className="post__footer">
                        <div className="reactions">
                            <IoHeart />
                            <span>256 likes</span>
                        </div>
                        <div className="comments">
                            <IoChatbubble className="active" />
                            <span>543 comments</span>
                        </div>
                        <div className="readmore">
                            <IoIosShareAlt />
                            <span>123 shares</span>
                        </div>
                    </div>
                   
                </div>

            </div>
        </>
    );
});

export default Post;
