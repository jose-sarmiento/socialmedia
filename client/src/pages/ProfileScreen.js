import React, { useEffect } from "react";
import { Routes, Route, NavLink, useParams, Outlet } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import {
    Header,
    LeftSide,
    Messenger,
    MyNewsFeed,
    About,
    Friends,
    Photos,
    Loader,
} from "../components";

import { useSelector, useDispatch } from "react-redux";
import { uploadCover, uploadProfile } from "../store/users";

const ProfileScreen = () => {
    // const { path, url } = useRouteMatch();
    const dispatch = useDispatch();

    let links = [
        { text: "Timeline", url: "" },
        { text: "About", url: "about" },
        { text: "Friends", url: "friends" },
        { text: "Photos", url: "photos" },
    ];

    const auth = useSelector((state) => state.auth);
    const users = useSelector((state) => state.entities.users);
    const { user, friends, friendRequests, people, loading } = users;

    const handleCoverChange = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("cover", e.target.files[0]);
        dispatch(uploadCover(formData));
    };

    const handleProfileChange = (e) => {
        const formData = new FormData();
        formData.append("profile", e.target.files[0]);
        dispatch(uploadProfile(formData));
    };

    if (!user) return null;

    return (
        <>
            <div className="profile mb-1">
                <div className="cover">
                    {user.coverImage && (
                        <img
                            src={user.coverImage}
                            alt="cover"
                            className="cover__image"
                        />
                    )}

                    <div className="cover__footer">
                        <h1 className="profile__name">{`${user.firstname} ${user.lastname}`}</h1>
                        <label className="profile__edit-cover" htmlFor="cover">
                            <i className="profile__edit-icon">
                                <FaCamera className="mr-1" />
                                Edit Cover
                            </i>
                        </label>
                        <input
                            type="file"
                            accept="image/png,image/jpeg"
                            name="cover"
                            id="cover"
                            onChange={handleCoverChange}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>

                <div className="profile__footer">
                    <figure className="profile__image-wrapper">
                        <div className="profile__container">
                            <img
                                src={user.profileImage}
                                alt="profile"
                                className="profile__image"
                            />
                            <label
                                className="profile__edit-profile"
                                htmlFor="profile"
                            >
                                <i className="profile__edit-icon">
                                    <FaCamera className="mr-1" />
                                </i>
                            </label>
                            <input
                                type="file"
                                accept="image/png,image/jpeg"
                                name="profile"
                                id="profile"
                                onChange={handleProfileChange}
                                style={{ display: "none" }}
                            />
                        </div>
                    </figure>

                    <div className="profile__links">
                        <ul className="full-h-nav">
                            {links.map((link, idx) => {
								let opts = {};
								if (idx === 0) {
									opts['end'] = 'end';
								}
								return ( <li className="full-h-nav__item">
                                    <NavLink
                                        key={idx}
                                        to={link.url}
										{...opts}
                                        className={({isActive}) =>
											isActive
                                                ? "full-h-nav__link full-h-nav__link--active"
                                                : "full-h-nav__link"
                                        }
                                    >
                                        {link.text}
                                    </NavLink>
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <Outlet />

            <Routes>
                <Route index element={<MyNewsFeed/>} />
                <Route path="timeline" element={<MyNewsFeed/>} />
                <Route path="about" element={<About profile={user} />} />
                <Route path="friends" element={<Friends />} />
                <Route path="photos" element={<Photos photos={user.photos} />} />
            </Routes>
        </>
    );
};

export default ProfileScreen;
