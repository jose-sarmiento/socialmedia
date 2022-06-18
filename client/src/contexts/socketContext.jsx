import React, { useContext, useRef, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  messageReceived,
  newChatReceived,
  onlineUsersUpdated,
  readMessageInConversation,
} from '../store/chats';
import { notificationAdded } from '../store/notifications';
import { friendRequestAdded, friendRequestAccepted } from '../store/users';

const SocketContext = React.createContext();

export function SocketProvider({ children }) {
  const socket = useRef(io('ws://socialize-v1.herokuapp.com'));
  const dispatch = useDispatch();

  const users = useSelector((state) => state.entities.users);
  const { user } = users;

  const openChat = (chatId) => {
    socket.current.emit('event://open-chat', chatId);
  };

  const emitMessage = (payload) => {
    socket.current.emit('event://send-message', payload);
  };

  const emitChat = (chat, receiverId) => {
    socket.current.emit('event://send-new-chat', { chat, receiverId });
  };

  const emitFriendRequest = ({ notification, friendRequest }) => {
    socket.current.emit('event://send-friend-request', {
      notification,
      friendRequest,
    });
  };

  const emitFriendRequestAccepted = ({ notification, friend }) => {
    socket.current.emit('event://accept-friend-request', {
      notification,
      friend,
    });
  };

  const disconnect = (id) => {
    socket.current.emit('event://disconnect', id);
  };

  useEffect(() => {
    if (!user) return;

    const payload = _.pick(user, [
      '_id',
      'firstname',
      'lastname',
      'profileImage',
    ]);
    socket.current.emit('event://setup', payload);
  }, [user]);

  useEffect(() => {
    socket.current.on('event://get-users', (onlineUsers) => {
      dispatch(onlineUsersUpdated(onlineUsers));
    });

    socket.current.on('event://receive-message', (payload) => {
      const { conversationId, message } = payload;
      dispatch(readMessageInConversation(conversationId, message._id));
      dispatch(messageReceived(payload));
    });

    socket.current.on('event://receive-new-chat', (chat) => {
      dispatch(newChatReceived(chat));
    });

    socket.current.on(
      'event://receive-friend-request',
      ({ notification, friendRequest }) => {
        dispatch(friendRequestAdded({ friendRequest }));
        dispatch(notificationAdded(notification));
      }
    );

    socket.current.on(
      'event://receive-accept-friend-request',
      ({ notification, friend }) => {
        dispatch(friendRequestAccepted({ friend }));
        dispatch(notificationAdded(notification));
      }
    );
  }, [dispatch]);

  const contextValues = useMemo(
    () => ({
      socket,
      openChat,
      emitMessage,
      emitChat,
      emitFriendRequest,
      emitFriendRequestAccepted,
      disconnect,
    }),
    []
  );

  return (
    <SocketContext.Provider value={contextValues}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketContext = () => useContext(SocketContext);
