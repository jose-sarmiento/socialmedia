import React, { useState, useRef, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { AppLayout } from '../../container';
import { Post, SkeletonLoading } from '../../components';
import { createNotification } from '../../store/notifications';
import useFetch from '../../hooks/useFetch';

import { acceptRequest, rejectRequest } from '../../store/users';
import { listPostsSuccess } from '../../store/posts';

import './HomeScreen.scss';

function HomeScreen() {
  const [page, setPage] = useState(1);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.entities.users);
  const posts = useSelector((state) => state.entities.posts);
  const chats = useSelector((state) => state.entities.chats);

  const { loading, hasNext } = useFetch('/api/v1/posts', page, 10, listPostsSuccess);

  useEffect(() => {
    const interval = setInterval(() => {
      const friendIds = users.friends.map((x) => x._id);
      const filtered = chats.onlineUsers.filter((x) =>
        friendIds.includes(x._id)
      );
      setOnlineFriends(filtered);
    }, 60000);
    return () => clearInterval(interval);
  }, [chats.onlineUsers, users.friends]);

  useEffect(() => {
    const friendIds = users.friends.map((x) => x._id);
    const filtered = chats.onlineUsers.filter((x) => friendIds.includes(x._id));
    setOnlineFriends(filtered);
  }, [chats.onlineUsers, users.friends]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasNext]
  );

  const handleCommentClick = (postId) => {
    navigate(`/posts/${postId}`, { state: { focusCommentInput: true } });
  };

  const handleAcceptFriend = (friend) => {
    dispatch(
      createNotification({
        recipientId: friend._id,
        type: 'accept-friend',
      })
    );
    dispatch(
      acceptRequest(
        _.pick(friend, [
          '_id',
          'firstname',
          'lastname',
          'profileImage',
          'username',
        ])
      )
    );
  };

  const handleRejectFriend = (id) => {
    dispatch(rejectRequest(id));
  };

  if (users.loading.user) return null;

  return (
    <AppLayout page="homepage">
      <div className="section-container timeline">
        <div className="section-container__header">
          <h4>Your newsfeed</h4>
        </div>

        <div className="section-container__body">
          {posts.list.map((post, index) => {
            let ref = null;
            if (posts.list.length === index + 1) {
              ref = lastElementRef;
            }
            return (
              <Post
                ref={ref}
                post={post}
                key={uuidv4()}
                handleCommentClick={handleCommentClick}
              />
            );
          })}

          {loading && <SkeletonLoading count={3} />}
        </div>
      </div>

      <div className="others">
        <div className="list list--birthdays">
          <div className="list__header">
            <FaGift />
            <h4>Birthdays</h4>
            {users.birthdays.length > 2 && <Link to="/friends">See all</Link>}
          </div>
          {/* eslint-disable-next-line */}
          {users.loading.get ? (
            <div className="birthday">
              <figure className="skeleton" />
              <div className="birthday__user">
                <p className="birthday__username skeleton" />
                <p className="birthday__age skeleton" />
              </div>
            </div>
          ) : users.birthdays.length === 0 ? (
            <div className="birthday birthday--none">
              <span className="birthday__no-birthday">
                <FaGift /> No birthdays today
              </span>
            </div>
          ) : (
            <>
              {users.birthdays.slice(0, 2).map((birthday) => {
                const today = new Date();
                const birthDate = new Date(birthday.birthdate);
                const age = today.getFullYear() - birthDate.getFullYear();
                return (
                  <div className="birthday" key={birthday._id}>
                    <figure>
                      <img src={birthday.profileImage} alt="birthday user" />
                    </figure>
                    <div className="birthday__user">
                      <p className="birthday__username">{`${birthday.firstname} ${birthday.lastname}`}</p>
                      <p className="birthday__age">{age} years old</p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div className="list list--requests">
          <div className="list__header">
            <FaGift />
            <h4>Friend Requests</h4>
            {users.friendRequests.length > 2 && <span>See all</span>}
          </div>
          {/* eslint-disable-next-line */}
          {users.loading.get ? (
            <div className="request">
              <figure className="skeleton" />
              <div className="request__user">
                <p className="request__username skeleton" />
                <p className="request__age skeleton" />
                <div className="request__actions mt-2">
                  <div className="request__action skeleton" />
                  <div className="request__action skeleton" />
                </div>
              </div>
            </div>
          ) : users.friendRequests.length === 0 ? (
            <div className="request request--none">
              <span className="request__no-request">
                No friend request at the moment
              </span>
            </div>
          ) : (
            <>
              {users.friendRequests.slice(0, 2).map((friend) => (
                <div className="request" key={friend._id}>
                  <figure>
                    <img src={friend.profileImage} alt="request user" />
                  </figure>
                  <div className="request__user">
                    <p className="request__username">{`${friend.firstname} ${friend.lastname}`}</p>
                    <p className="request__age">@{friend.username}</p>
                    <div className="request__actions">
                      <button
                        type="button"
                        className="request__action"
                        onClick={() => handleAcceptFriend(friend)}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="request__action"
                        onClick={() => handleRejectFriend(friend._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="list list--actives">
          <div className="list__header">
            <h4>Active Chats</h4>
          </div>
          {onlineFriends.map((friend) => (
            <div className="active-chat" key={friend._id}>
              <figure>
                <img src={friend.profileImage} alt="active-chat user" />
              </figure>
              <div className="active-chat__user">
                <p className="active-chat__username">{`${friend.firstname} ${friend.lastname}`}</p>
                {friend.status === 'online' ? (
                  <p className="active-chat__online">
                    <span className="active-chat__circle" />
                    online
                  </p>
                ) : (
                  <p className="active-chat__online">
                    <BsClockHistory className="active-chat__ago" />
                    active {moment(friend.lastOnline).fromNow()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default HomeScreen;
