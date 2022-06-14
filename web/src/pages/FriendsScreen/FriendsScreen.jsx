import React, { useEffect, useRef } from 'react';
import { FiUsers, FiUserPlus } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppLayout } from '../../container';
import { Friend, AddFriend, FriendRequest } from '../../components';
import { addFriendReset, acceptFriendReset } from '../../store/users';
import { createNotificationReset } from '../../store/notifications';
import { useSocketContext } from '../../contexts/socketContext';

import './FriendsScreen.scss';

function FriendsScreen() {
  const friendRequestsRef = useRef({});

  const { state: locationState } = useLocation();
  const dispatch = useDispatch();
  const { emitFriendRequest, emitFriendRequestAccepted } = useSocketContext();

  const users = useSelector((state) => state.entities.users);
  const { success } = users;

  const notifications = useSelector((state) => state.notifications);
  const { createdNotification } = notifications;

  useEffect(() => {
    if (!(locationState && locationState.scroll)) return;
    friendRequestsRef.current[locationState.scroll]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [locationState]);

  useEffect(() => {
    if (success.add && createdNotification) {
      emitFriendRequest({
        notification: createdNotification,
        friendRequest: {
          ...createdNotification.from,
          status: 2,
        },
      });
      dispatch(createNotificationReset());
      dispatch(addFriendReset());
    }
  }, [success.add, createdNotification, dispatch, emitFriendRequest]);

  useEffect(() => {
    if (success.accept && createdNotification) {
      emitFriendRequestAccepted({
        notification: createdNotification,
        friend: {
          ...createdNotification.from,
          status: 3,
        },
      });
      dispatch(createNotificationReset());
      dispatch(acceptFriendReset());
    }
  }, [
    success.accept,
    createdNotification,
    dispatch,
    emitFriendRequestAccepted,
  ]);

  return (
    <AppLayout>
      <div className="_friends">
        <div className="_friends__list _friends__list--me">
          <div className="_friends__header">
            <FiUsers />
            <h4>Friends</h4>
            <span>({users.friends.length})</span>
          </div>
          <div className="_friends__body">
            {users.friends.map((friend, idx) => (
              <Friend friend={friend} idx={idx} key={friend._id} />
            ))}
          </div>
        </div>
        <div className="_friends__list _friends__list--requests">
          <div className="_friends__header">
            <FiUserPlus />
            <h4>Friends Requests</h4>
            <span>({users.friendRequests.length})</span>
          </div>
          <div className="_friends__body">
            {users.friendRequests.map((friend, idx) => (
              <FriendRequest
                friend={friend}
                idx={idx}
                key={friend._id}
                ref={(el) => {
                  friendRequestsRef.current[friend._id] = el;
                }}
              />
            ))}
          </div>
        </div>
        <div className="_friends__list _friends__list--people">
          <div className="_friends__header">
            <FiUsers />
            <h4>People you should add</h4>
          </div>
          <div className="_friends__body">
            {users.people.map((friend) => (
              <AddFriend friend={friend} key={friend._id} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default FriendsScreen;
