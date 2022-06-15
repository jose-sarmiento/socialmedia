import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  NavLink,
  useParams,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { FiGlobe, FiEye, FiUsers } from 'react-icons/fi';
import { BsImages, BsChat } from 'react-icons/bs';
import { TiLocation } from 'react-icons/ti';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Photos } from '../../components';
import { Newsfeed, Friends, ViewProfile } from '../../container';

import { viewUserProfile } from '../../store/users';
import {
  createNewConversation,
  createChatReset,
  activeChatSelected,
} from '../../store/chats';
import { useSocketContext } from '../../contexts/socketContext';

function ViewUserScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    { text: 'Activity', url: '', icon: <FiEye /> },
    { text: 'Photos', url: 'photos', icon: <BsImages /> },
    { text: 'Friends', url: 'friends', icon: <FiUsers /> },
    { text: 'View profile', url: 'view', icon: <FaUserCog /> },
  ];

  const users = useSelector((state) => state.entities.users);
  const { viewUser } = users;
  const chats = useSelector((state) => state.entities.chats);
  const { createdChat } = chats;
  const { emitChat } = useSocketContext();

  useEffect(() => {
    dispatch(viewUserProfile(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!createdChat) return;

    // emit
    emitChat(createdChat, viewUser._id);
    navigate('/messages');
    dispatch(createChatReset());
  }, [createdChat, viewUser._id, navigate, dispatch, emitChat]);

  const messageHandler = () => {
    const exists = chats.list.find((chat) =>
      chat.members.some((x) => x._id === viewUser._id)
    );
    if (exists) {
      dispatch(activeChatSelected({ chatId: exists._id }));
      navigate('/messages');
    } else {
      dispatch(createNewConversation(viewUser._id));
    }
  };

  if (!viewUser) return null;

  return (
    <div className="profile mb-1">
      <div className="profile__cover">
        {viewUser.coverImage && (
          <img
            src={
              viewUser.coverImage || 'https://www.freeiconspng.com/img/23480'
            }
            alt="cover"
            className="profile__cover-image"
          />
        )}
      </div>

      <div className="profile__container">
        <div className="profile__left">
          <div className="profile__sticky">
            <div className="userinfo">
              <button
                type="button"
                className="userinfo__message"
                onClick={messageHandler}
              >
                <BsChat />
              </button>
              <figure>
                <img
                  src={
                    viewUser.profileImage.startsWith('http')
                      ? viewUser.profileImage
                      : process.env.REACT_APP_SERVER + viewUser.profileImage
                  }
                  alt="profile"
                />
              </figure>
              <h1>{`${viewUser.firstname} ${viewUser.lastname}`}</h1>
              <p className="userinfo__username">{viewUser.username}</p>
              <p className="userinfo__address">
                <TiLocation />
                {viewUser.address} <FiGlobe />
              </p>
              <p className="userinfo__bio">
                Lorem ipsum, dolor, sit amet consectetur adipisicing elit. Quam,
                pariatur.
              </p>

              <div className="userinfo__footer">
                <div>
                  <span className="label">Posts</span>
                  <span className="count">145</span>
                </div>
                <div>
                  <span className="label">Friends</span>
                  <span className="count">784</span>
                </div>
                <div>
                  <span className="label">Photos</span>
                  <span className="count">{viewUser.photos.length}</span>
                </div>
              </div>
            </div>

            <div className="profile__nav">
              {links.map((link, idx) => {
                if (idx === 0) {
                  return (
                    <NavLink
                      key={uuidv4()}
                      to={link.url}
                      end="end"
                      className={({ isActive }) =>
                        isActive
                          ? 'profile__nav-item profile__nav-item--active'
                          : 'profile__nav-item'
                      }
                    >
                      <span className="profile__nav-icon">{link.icon}</span>
                      <span className="profile__nav-label">{link.text}</span>
                    </NavLink>
                  );
                }
                return (
                  <NavLink
                    key={uuidv4()}
                    to={link.url}
                    className={({ isActive }) =>
                      isActive
                        ? 'profile__nav-item profile__nav-item--active'
                        : 'profile__nav-item'
                    }
                  >
                    <span className="profile__nav-icon">{link.icon}</span>
                    <span className="profile__nav-label">{link.text}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
        <div className="profile__right">
          <Outlet />

          <Routes>
            <Route index element={<Newsfeed userId={id} />} />
            <Route path="activity" element={<Newsfeed userId={id} />} />
            <Route
              path="photos"
              element={<Photos photos={viewUser.photos} />}
            />
            <Route path="view" element={<ViewProfile />} />
            <Route
              path="friends"
              element={<Friends friends={viewUser.friends} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ViewUserScreen;
