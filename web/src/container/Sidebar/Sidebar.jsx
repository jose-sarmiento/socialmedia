import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiHome, HiUser, HiUsers, HiBell, HiChatAlt2 } from 'react-icons/hi';
import { logout } from '../../store/auth';
import { useSocketContext } from '../../contexts/socketContext';
import { showModal } from '../../store/ui';

import './Sidebar.scss';

function Sidebar() {
  const [msgCount, setMsgCount] = useState();
  const [notifCount, setNotifCount] = useState();

  const auth = useSelector((state) => state.auth);
  const chats = useSelector((state) => state.entities.chats);
  const notifications = useSelector((state) => state.notifications);

  const dispatch = useDispatch();
  const { disconnect } = useSocketContext();

  const links = [
    {
      id: 1,
      text: 'Home',
      url: '/',
      icon: <HiHome />,
    },
    {
      id: 2,
      text: 'Profile',
      url: '/users/me',
      icon: <HiUser />,
    },
    {
      id: 3,
      text: 'Friends',
      url: '/friends',
      icon: <HiUsers />,
    },
    {
      id: 4,
      text: 'Notifications',
      url: '/notifications',
      icon: <HiBell />,
    },
    {
      id: 5,
      text: 'Messages',
      url: '/messages',
      icon: <HiChatAlt2 />,
    },
  ];

  useEffect(() => {
    const unreadNotifCount = notifications.list.filter(
      (item) => item.isRead === false
    ).length;
    const unreadMsgCount = chats.list.filter((item) =>
      item.messages.some((x) => !x.seenBy.includes(auth.user._id))
    ).length;

    setMsgCount(unreadMsgCount);
    setNotifCount(unreadNotifCount);
  }, [auth.user, chats.list, notifications.list]);

  function handleLogout() {
    disconnect(auth.user._id);
    dispatch(logout());
  }

  return (
    <div className="sidebar">
      <ul className="sidebar__links">
        {links.map((link) => (
          <li className="sidebar__link-item" key={link.id}>
            <NavLink
              to={link.url}
              className={({ isActive }) =>
                isActive
                  ? 'sidebar__link sidebar__link--active'
                  : 'sidebar__link'
              }
            >
              {link.icon}
              {link.text}
            </NavLink>
            {link.id === 4 && notifCount > 0 && (
              <span className="sidebar__count">{notifCount}</span>
            )}
            {link.id === 5 && msgCount > 0 && (
              <span className="sidebar__count">{msgCount}</span>
            )}
          </li>
        ))}
      </ul>

      <div className="sidebar__btn-wrapper">
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => dispatch(showModal())}
        >
          Create Post
        </button>
        <button
          type="button"
          className="btn btn--outline mt-2"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
