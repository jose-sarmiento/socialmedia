import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import {
  FaCamera,
  FaHeart,
  FaLaugh,
  FaThumbsUp,
  FaPaperPlane,
} from 'react-icons/fa';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Header, LeftSide, Messenger, Loader } from '../components';
import img from '../assets/img/profiles/d1.jpg';

import { usePostsContext } from '../contexts/postsContext';

const ViewPostScreen = () => {
  const { id } = useParams();
  const { getPost, post, loadingGet, errorGet } = usePostsContext();

  useEffect(() => {
    getPost(id);
  }, [id, useParams]);

  if (!post) return null;

  return (
    <>
      <div className='main-container container'>
        <Header />
        <LeftSide />
        <div className='middle-content'>
          {loadingGet && <Loader />}
          {!loadingGet && (
            <div className='post post--lg'>
              <div className='post__header mb-_5'>
                <img
                  className='post__user-img'
                  src={post.author.profileImage}
                  alt={`${post.author.firstname} ${post.author.lastname}`}
                />

                <h2 className='post__heading'>
                  {`${post.author.firstname} ${post.author.lastname} Shared a Story`}
                  <span className='middot'>&#9679;</span>
                  <span className='post__follow'>Following</span>
                </h2>

                <span className='post__time'>
                  {moment(post.createdAt).fromNow(true)}
                </span>
              </div>

              <div className='post__body'>
                {post.multimedia && post.multimedia.length > 0 && (
                  <div className='post__media-- mb-1'>
                    {post.multimedia.map((media, index) => {
                      return (
                        <div className='post__image-wrapper mb-1' key={index}>
                          {media.type === 'image' ? (
                            <img
                              className='post__image'
                              src={
                                process.env.REACT_APP_SERVER + media.thumbnail
                              }
                              alt='test'
                            />
                          ) : (
                            <ReactPlayer
                              playing={true}
                              controls={true}
                              light={
                                process.env.REACT_APP_SERVER + media.thumbnail
                              }
                              url={process.env.REACT_APP_SERVER + media.path}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div> //end of post medua
                )}

                <div className='post__description'>
                  {/* <h2 className='post__title'>Witness the Beauty of Paris</h2> */}
                  {post.body && <p className='post__caption'>{post.body}</p>}
                </div>

                <div className='post__stats'>
                  <div className='post__reacts'>
                    <div className='post__react'>
                      <FaThumbsUp className='post__react-icon' />
                    </div>
                    <div className='post__react post__react--laugh'>
                      <FaLaugh className='post__react-icon' />
                    </div>
                    <div className='post__react  post__react--heart'>
                      <FaHeart className='post__react-icon' />
                    </div>
                  </div>
                  <span className='post__people-react'>
                    Sarah, Jane and 23 others
                  </span>
                  <span className='post__comment-counts'>{`${post.comments.length} comments`}</span>
                </div>
              </div>

              <div className='post__comments'>
                <div className='comment'>
                  <div className='comment__header'>
                    <img
                      src={img}
                      className='comment__commenter-image'
                      alt='test'
                    />
                    <div className='comment__commenter-details'>
                      <h4 className='comment__commenter-name'>John Lucas</h4>
                      <span className='comment__passby'>1 hour ago</span>
                    </div>
                  </div>

                  <div className='comment__body'>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Fugit vel molestias possimus unde qui culpa tempore
                      eveniet assumenda animi excepturi!
                    </p>
                  </div>

                  <div className='comment__actions'>
                    <button className='comment__btn'>Like</button>
                    <button className='comment__btn'>Reply</button>
                  </div>

                  <span className='comment__view-all'>View all 10 replies</span>

                  <div className='comment__replies'>
                    <div className='reply'>
                      <img src={img} alt='#' className='reply__replier-image' />
                      <div className='reply__body-wrapper'>
                        <div className='reply__body'>
                          <h4 className='reply__replier-name'>Mary Smith</h4>
                          <p className='reply__reply'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Vero, explicabo! ipsum dolor :)
                          </p>
                        </div>
                        <div className='comment__actions'>
                          <button className='comment__btn'>Like</button>
                          <button className='comment__btn'>Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='post__footer post__footer--withsuggest'>
                <form action='#' className='post__comment-form'>
                  <input
                    type='text'
                    placeholder='Write a comment'
                    className='post__comment-input'
                    required
                  />
                  <FaCamera className='post__comment-icon' />
                </form>

                <button className='post__action post__action--like'>
                  <FaPaperPlane className='btn__icon--paper-plane' />
                </button>
              </div>
            </div>
          )}
        </div>

        <Messenger />
      </div>
    </>
  );
};

export default ViewPostScreen;
