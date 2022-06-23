import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTelegramPlane } from 'react-icons/fa';
import { FiPaperclip, FiSmile, FiArrowLeft } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { AppLayout } from '../../container';
import { Chat, ChatBubble, Message } from '../../components';
import {
  sendMessage,
  activeChatSelected,
  createNewConversation,
  createChatReset,
} from '../../store/chats';
import { searchUsers, clearSearchResults } from '../../store/users';
import { useSocketContext } from '../../contexts/socketContext';

import './MessagesScreen.scss';

function MessagesScreen() {
  const [chosenEmoji] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchIsFocus, setSearchIsFocus] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const chats = useSelector((state) => state.entities.chats);
  const { list, activeChatId, newMessage, createdChat } = chats;

  const users = useSelector((state) => state.entities.users);
  const auth = useSelector((state) => state.auth);

  const { emitMessage, socket, emitChat } = useSocketContext();
  const dispatch = useDispatch();
  const lastItemRef = useRef();
  const chatInputRef = useRef();

  useEffect(() => {
    lastItemRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(() => {
    if (searchTerm.trim() === '' && users.searchResults) {
      dispatch(clearSearchResults());
      return;
    }

    if (searchTerm.trim() !== '') {
      dispatch(searchUsers(searchTerm.trim()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, dispatch]);

  useEffect(() => {
    if (!activeChatId) return;
    const convo = list.find((x) => x._id === activeChatId);
    if (!convo) {
      setMessages([]);
      return;
    }
    setMessages(convo.messages.map((msg) => ({ ...msg, sent: true })));
  }, [list, activeChatId]);

  useEffect(() => {
    if (!newMessage) return;

    emitMessage(newMessage);
    chatInputRef.current.value = '';
  }, [newMessage, emitMessage]);

  useEffect(() => {
    if (!createdChat) return;

    // emit
    emitChat(
      createdChat,
      createdChat.members.find((x) => x !== auth.user._id)
    );
    dispatch(activeChatSelected({ chatId: createdChat._id }));
    dispatch(clearSearchResults());
    setSearchIsFocus(false);
    setSearchTerm('');
    dispatch(createChatReset());
  }, [createdChat, auth.user._id, dispatch, emitChat]);

  useEffect(() => {
    if (!chosenEmoji) return;

    chatInputRef.current.value += chosenEmoji.emoji;
  }, [chosenEmoji]);

  useEffect(() => {
    socket.current.on('event://typing', (name) => setIsTyping(name));
    socket.current.on('event://stop-typing', () => setIsTyping(false));
  }, [socket]);

  // const onEmojiClick = (event, emojiObject) => {
  //   setChosenEmoji(emojiObject);
  // }

  const timeoutFunction = () => {
    setTyping(false);
    socket.current.emit('event://stop-typing');
  };

  const typingHandler = (e) => {
    if (e.which === 13 && e.keyCode === 13) return;
    let timeout;

    if (typing === false) {
      setTyping(true);
      socket.current.emit('event://typing', users.user.firstname);
      timeout = setTimeout(timeoutFunction, 3000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 3000);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeSearch = () => {
    dispatch(clearSearchResults());
    setSearchIsFocus(false);
    setSearchTerm('');
  };

  const handleOpenConversation = (id) => {
    const exists = list.find((chat) => chat.members.some((x) => x._id === id));
    if (exists) {
      dispatch(activeChatSelected({ chatId: exists._id }));
      dispatch(clearSearchResults());
      setSearchIsFocus(false);
      setSearchTerm('');
      // TODO add to cache
    } else {
      dispatch(createNewConversation(id));
    }
  };

  function handleChatSubmit(e) {
    e.preventDefault();
    const msg = {
      _id: uuidv4(),
      sender: {
        _id: users.user._id,
        firstname: users.user.firstname,
        lastname: users.user.lastname,
        profileImage: users.user.profileImage,
      },
      text: chatInputRef.current.value,
      sent: false,
      createdAt: +new Date(),
    };
    setMessages([...messages, msg]);
    dispatch(
      sendMessage({
        text: chatInputRef.current.value,
        activeChatId,
      })
    );
    socket.current.emit('event://stop-typing');
  }

  return (
    <AppLayout>
      <div className="messages">
        <div className="messages__left">
          <div className="messages__search-container">
            <form className="search">
              {searchIsFocus ? (
                <FiArrowLeft
                  className="search__icon"
                  style={{ cursor: 'pointer' }}
                  onClick={closeSearch}
                />
              ) : (
                <FaSearch className="search__icon" />
              )}
              <input
                type="search"
                name="search"
                id="search"
                className="search__input"
                placeholder="Search something..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setSearchIsFocus(true)}
                autoComplete="off"
              />
            </form>
          </div>

          {!searchIsFocus ? (
            <div className="messages__chat-list">
              {list.map((chat) => (
                <Chat
                  chat={chat}
                  key={chat._id}
                  active={activeChatId === chat._id}
                />
              ))}
            </div>
          ) : (
            <ul className="messages__search-results">
              {users.loading.search ? (
                <>
                  {[...Array(3).keys()].map(() => (
                    <li className="user user--skeleton">
                      <figure className="skeleton" />
                      <span className="skeleton" />
                      <span className="skeleton ml-1" />
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {users.searchResults.map((x) => (
                    <li
                      className="user"
                      onClick={() => handleOpenConversation(x._id)}
                      onKeyDown={() => handleOpenConversation(x._id)}
                      role="menuitem"
                    >
                      <figure>
                        <img src={x.profileImage} alt={x.name} />
                      </figure>
                      <span>{x.name}</span>
                    </li>
                  ))}
                </>
              )}
            </ul>
          )}
        </div>
        <div className="messages__right">
          <div className="messages__list">
            {messages.map((message, idx, arr) => {
              let sameAsPrevious = false;
              if (idx > 0 && arr[idx - 1].sender._id === message.sender._id) {
                sameAsPrevious = true;
              }
              return (
                <Message
                  key={uuidv4()}
                  ref={idx === messages.length - 1 ? lastItemRef : null}
                  message={message}
                  sameAsPrevious={sameAsPrevious}
                  isLastItem={idx === messages.length - 1}
                />
              );
            })}
            {isTyping && <ChatBubble name={isTyping} />}
          </div>

          {activeChatId && (
            <form className="chat-form" onSubmit={handleChatSubmit}>
              <div className="chat-form__left">
                <FiSmile />
                <input
                  type="text"
                  placeholder="Type a message"
                  ref={chatInputRef}
                  onKeyDown={typingHandler}
                />
                <FiPaperclip />
              </div>
              <button type="submit" className="chat-form__submit">
                <FaTelegramPlane />
              </button>
              {/* <Picker onEmojiClick={onEmojiClick} /> */}
            </form>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default MessagesScreen;
