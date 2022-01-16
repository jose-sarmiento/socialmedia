import React, { useState, useRef, useEffect } from "react";
import { FaCamera, FaShare } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import PostMedias from "./PostMedias";
import ReactButton from "./ReactButton";
import ReactionPreview from "./ReactionPreview";
import { useAuthContext } from "../contexts/authContext";
import { usePostsContext } from "../contexts/postsContext";

const maxCount = 200;

const Post = React.forwardRef(({ post }, ref) => {
  const { auth } = useAuthContext();
  const {
    createComment,
    successComment,
    likePost,
    updatePostReact,
    loadingReact,
  } = usePostsContext();

  // local states
  const [showMore, setShowMore] = useState(false);
  const [reactionPreviews, setReactionPreviews] = useState([]);
  const [userReaction, setUserReaction] = useState({});
  const [commentsCount, setCommentsCount] = useState(0);
  const commentInputRef = useRef();

  useEffect(() => {
    const reaction = post.reactions.find((react) => {
      return react.userId === auth._id;
    });
    setUserReaction(reaction);
    setCommentsCount(post.comments.length)
  }, [])

  useEffect(() => {
    console.log('post comoonent render')
  })

  useEffect(() => {
    const allReactions = post.reactions.map((i) => i.reaction);
    const distinct = [...new Set(allReactions)];
    const newArr = distinct.map((react) => {
      const count = allReactions.filter((item) => item === react).length;
      return { count, react };
    });
    const sorted = newArr.sort((a, b) => (a.count > b.count ? 1 : -1));
    setReactionPreviews(sorted);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (commentInputRef.current.value === "") return;

    createComment(post._id, commentInputRef.current.value);
    if (successComment) {
      setCommentsCount((prev) => prev + 1);
      commentInputRef.current.value = "";
    }
  };

  return (
    <div className="post" ref={ref}>
      <Link to={`/posts/${post._id}`}>
        <div className="post__header mb-_5">
          <img
            className="post__user-img"
            src={post.author.profileImage}
            alt={`${post.author.firstname} ${post.author.lastname}`}
          />

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
        {post.multimedia && post.multimedia.length > 0 && (
          <PostMedias posts={post.multimedia} />
        )}

        <div className="post__description">
          {post.title && <h2 className="post__title">{post.title}</h2>}
          {post.body && (
            <p className="post__caption">
              {showMore
                ? post.body
                : post.body.split("").length <= maxCount
                ? post.body
                : `${post.body.substring(0, maxCount)}... `}
              <span
                className="post_show-more"
                onClick={() => setShowMore(!showMore)}
              >
                {post.body.split("").length >= maxCount && "show more"}
              </span>
            </p>
          )}
        </div>

        <div className="post__stats">
          <div className="post__reacts">
            {reactionPreviews.slice(0, 3).map((type, index) => (
              <ReactionPreview type={type} key={index} />
            ))}
          </div>

          <span className="post__people-react">Sarah, Jane and 23 others</span>

          {commentsCount > 0 && (
            <span className="post__comment-counts">
              {`${commentsCount} comments`}
            </span>
          )}
        </div>
      </div>

      <div className="post__footer">
        <form className="post__comment-form" onSubmit={handleSubmit}>
          <input
            ref={commentInputRef}
            type="text"
            placeholder="Write a comment"
            className="post__comment-input"
            required
          />
          <FaCamera className="post__comment-icon" />
        </form>

        <button className="post__action post__action--share">
          <FaShare className="post__action-icon" />
        </button>

        <ReactButton
          postId={post._id}
          userReaction={userReaction}
          create={likePost}
          update={updatePostReact}
        />
      </div>
    </div>
  );
});

export default Post;
