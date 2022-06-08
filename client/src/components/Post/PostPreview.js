import React from "react";
import moment from "moment";
import PostMediasPreview from "../PostMediasPreview";

import "./Post.scss";

const PostPreview = React.forwardRef((props, ref) => {
    const { post } = props;
    return (
        <div className="post post--wide" ref={ref}>
            <div className="post__right">
                <div className="post__header">
                    <figure className="post__user-img">
                        <img
                            src={post.author.profileImage}
                            alt={`${post.author.firstname} ${post.author.lastname}`}
                        />
                    </figure>
                    <h2 className="post__heading">
                        <span className="post__name" style={{pointerEvents: "none"}}>
                            {`${post.author.firstname} ${post.author.lastname}`}
                        </span>
                        <span className="middot">&#9679;</span>
                        <span className="post__follow">
                            @{post.author.username}
                        </span>
                    </h2>

                    <span className="post__time">
                        {moment(post.createdAt).fromNow(true)}
                    </span>
                </div>

                <div className="post__body">
                    <div className="post__description">
                        <p className="post__caption">{post.body}</p>
                        {post.multimedia && post.multimedia.length > 0 && (
                            <PostMediasPreview medias={post.multimedia} readOnly={true} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PostPreview;
