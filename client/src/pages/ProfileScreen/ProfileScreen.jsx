import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { FaCamera, FaUserCog } from 'react-icons/fa';
import { FiGlobe, FiEye, FiUsers } from 'react-icons/fi';
import { BsImages } from 'react-icons/bs';
import { TiLocation } from 'react-icons/ti';
import { useSelector, useDispatch } from 'react-redux';
import { Photos } from '../../components';
import { Newsfeed, Friends, EditProfile } from '../../container';

import { uploadCover, uploadProfile } from '../../store/users';

import './ProfileScreen.scss';

function ProfileScreen() {
  // const { path, url } = useRouteMatch();
  const dispatch = useDispatch();

  const links = [
    { text: 'Activity', url: '', icon: <FiEye /> },
    { text: 'Photos', url: 'photos', icon: <BsImages /> },
    { text: 'Friends', url: 'friends', icon: <FiUsers /> },
    { text: 'Edit profile', url: 'edit', icon: <FaUserCog /> },
  ];

  const users = useSelector((state) => state.entities.users);
  const { user, friends } = users;

  const handleCoverChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cover', e.target.files[0]);
    dispatch(uploadCover(formData));
  };

  const handleProfileChange = (e) => {
    const formData = new FormData();
    formData.append('profile', e.target.files[0]);
    dispatch(uploadProfile(formData));
  };

  if (!user) return null;

  return (
    <div className="profile mb-1">
      <div className="profile__cover">
        {user.coverImage && (
          <img
            src={user.coverImage || 'https://www.freeiconspng.com/img/23480'}
            alt="cover"
            className="profile__cover-image"
          />
        )}
        <label htmlFor="edit-cover" className="profile__edit-cover">
          <FaCamera /> Edit cover
        </label>
        <input
          type="file"
          accept="image/png,image/jpeg"
          name="cover"
          id="edit-cover"
          onChange={handleCoverChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="profile__container">
        <div className="profile__left">
          <div className="profile__sticky">
            <div className="userinfo">
              <figure>
                <img
                  src={user.profileImage}
                  alt="profile"
                />
                <label htmlFor="edit-profile">
                  <FaCamera />
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  name="profile"
                  id="edit-profile"
                  onChange={handleProfileChange}
                  style={{ display: 'none' }}
                />
              </figure>
              <h1>{`${user.firstname} ${user.lastname}`}</h1>
              <p className="userinfo__username">{user.username}</p>
              <p className="userinfo__address">
                <TiLocation />
                {user.address} <FiGlobe />
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
                  <span className="count">{user.photos.length}</span>
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
            <Route index element={<Newsfeed userId={user._id} />} />
            <Route path="activity" element={<Newsfeed userId={user._id} />} />
            <Route path="photos" element={<Photos photos={user.photos} />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="friends" element={<Friends friends={friends} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
