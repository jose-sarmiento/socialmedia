import React from "react";
import { v4 as uuidv4 } from "uuid";
import ReactPlayer from "react-player/lazy";

const PostMediasPreview = ({ medias, fullHeight }) => {
  return (
    <>
      <div
        className={fullHeight ? "post__media post__media--full" : "post__media"}
      >
        {medias.map((media, index) => {
          if (index > 2) return null;

          if (index === 0) {
            return (
              <div
                className={
                  index === 0 && medias.length === 1
                    ? "post__image-wrapper col-1-7 row-1-3"
                    : index === 0 && medias.length === 2
                    ? "post__image-wrapper col-1-4 row-1-3"
                    : "post__image-wrapper col-1-5 row-1-3"
                }
                key={uuidv4()}
              >
                {media.type === "image" ? (
                  <img
                    className="post__image"
                    src={
                      media.thumbnail.substring(0, 4) == "http"
                        ? media.thumbnail
                        : `${process.env.REACT_APP_SERVER + media.thumbnail}`
                    }
                    alt="test"
                  />
                ) : (
                  <ReactPlayer
                    playing={true}
                    controls={true}
                    light={media.thumbnail}
                    url={media.path}
                  />
                )}
              </div>
            );
          }

          if (index === 1) {
            return (
              <div
                className={
                  index === 1 && medias.length === 2
                    ? "post__image-wrapper col-4-7 row-1-3"
                    : "post__image-wrapper col-5-7 row-1-2"
                }
                key={uuidv4()}
              >
                <img className="post__image" src={media.thumbnail} alt="test" />
              </div>
            );
          }

          if (index === 2 && medias.length === 3) {
            return (
              <div
                className="post__image-wrapper col-5-7 row-2-3"
                key={uuidv4()}
              >
                <img className="post__image" src={media.thumbnail} alt="test" />
              </div>
            );
          }

          if (index === 2 && medias.length > 3) {
            return (
              <div
                className="post__image-wrapper post__image-wrapper--more col-5-7 row-2-3"
                key={uuidv4()}
              >
                <img className="post__image" src={media.thumbnail} alt="test" />
                <span className="post__more">+3 more images</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default PostMediasPreview;
