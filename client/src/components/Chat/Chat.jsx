import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  activeChatSelected,
  readMessagesInConversation,
} from '../../store/chats';
import { useSocketContext } from '../../contexts/socketContext';

import './Chat.scss';

function Chat({ chat, active }) {
  const [sender, setSender] = useState();
  const [latest, setLatest] = useState();
  const [unseenMessagesCount, setUnseenMessagesCount] = useState(0);

  const auth = useSelector((state) => state.auth);
  const chats = useSelector((state) => state.entities.chats);
  const dispatch = useDispatch();
  const { openChat } = useSocketContext();

  useEffect(() => {
    setSender(chat.members.find((x) => x._id !== auth.user._id));
    const latestChat = [...chat.messages].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setLatest(latestChat[0]);
    const msgs = chat.messages.filter((x) => !x.seenBy.includes(auth.user._id));
    setUnseenMessagesCount(msgs.length);
  }, [chat, auth]);

  const handleChatSelect = () => {
    // set unseen messages to true
    dispatch(activeChatSelected({ chatId: chat._id }));
    if (unseenMessagesCount > 0) {
      dispatch(readMessagesInConversation(chat._id));
    }
    openChat(sender._id);
  };

  function cutIfTooLong(text) {
    const maxlength = 26;
    if (text?.length > maxlength) {
      return `${text.slice(0, maxlength)}...`;
    }
    return text;
  }

  let classname;

  if (active) {
    classname = 'chat chat--active';
  } else if (latest && !latest?.seenBy.includes(auth.user._id)) {
    classname = 'chat chat--unseen';
  } else {
    classname = 'chat';
  }

  return (
    <div
      className={classname}
      onClick={handleChatSelect}
      onKeyDown={handleChatSelect}
      role="presentation"
    >
      <figure>
        <img src={sender?.profileImage} alt={`${sender?.firstname} dp`} />
        {chats.onlineUsers.some(
          (i) => i._id === sender?._id && i.status === 'online'
        ) && <span className="indicator" />}
      </figure>
      <div className="chat__content">
        <p className="chat__user">
          {`${sender?.firstname} ${sender?.lastname}`}{' '}
          <span className="chat__ago">
            {moment(latest?.createdAt).format('hh:mm')}
          </span>
        </p>
        <p className="chat__text">
          {cutIfTooLong(latest?.text)}{' '}
          {unseenMessagesCount > 0 && (
            <span className="chat__count-new">{unseenMessagesCount}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default Chat;
