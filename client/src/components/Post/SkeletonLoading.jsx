import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Post.scss';

function SkeletonLoading({ wide, count = 1 }) {
  return (
    <>
      {[...Array(count).keys()].map(() => (
        <div
          key={uuidv4()}
          className={
            wide ? 'post post--wide post--skeleton' : 'post post--skeleton'
          }
        >
          {!wide && (
            <div className="post__left">
              <figure className="post__user-img skeleton" />
            </div>
          )}

          <div className="post__right">
            <div className="post__header">
              {wide && <figure className="post__user-img" />}
              <h2 className="post__heading">
                <span className="post__name skeleton" />
                <span className="middot">&#9679;</span>
                <span className="post__follow skeleton" />
              </h2>

              <span className="post__time skeleton" />
            </div>

            <div className="post__body">
              <div className="post__description">
                <p className="post__caption skeleton" />
                <p className="post__caption skeleton" />
                <p className="post__caption skeleton" />
                <p className="post__caption skeleton " />
              </div>

              <div className="post__media post__media--3">
                <div className="post__image-wrapper skeleton" />
                <div className="post__image-wrapper skeleton" />
                <div className="post__image-wrapper skeleton" />
              </div>
            </div>

            <div className="post__footer">
              <div className="reactions">
                <span className="skeleton" />
                <span className="skeleton" />
              </div>
              <div className="comments">
                <span className="skeleton" />
                <span className="skeleton" />
              </div>
              <div className="readmore">
                <span className="skeleton" />
                <span className="skeleton" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SkeletonLoading;
