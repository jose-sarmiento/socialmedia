import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux"
import { HiHome, HiUser, HiUsers, HiBell, HiChatAlt2 } from "react-icons/hi";
import { logout } from '../../store/auth';

import "./Sidebar.scss"

const Sidebar = () => {

	const dispatch = useDispatch(); 

	const links = [
		{ text: "Home", url: "/", icon: <HiHome /> },
		{ text: "Profile", url: "/users/me", icon: <HiUser /> },
		{ text: "Friends", url: "/friends", icon: <HiUsers /> },
		{ text: "Notifications", url: "/notifications", icon: <HiBell /> },
		{ text: "Messages", url: "/messages", icon: <HiChatAlt2 /> },
	];

	return (
		<div className="sidebar">
			<ul className="sidebar__links">
				{links.map((link, idx) => (
					<li className="sidebar__link-item" key={idx}>
						<NavLink
							key={idx}
							to={link.url}
							className={({ isActive }) =>
								isActive
									? "sidebar__link sidebar__link--active"
									: "sidebar__link"
							}
						>
							{link.icon}
							{link.text}
						</NavLink>
					</li>
				))}

			</ul>
			
			<div className="sidebar__btn-wrapper">
				<button className="btn btn--primary">Create Post</button>
				<button className="btn btn--outline mt-2" onClick={() => dispatch(logout())}>Log out</button>
			</div>
		</div>
	);
};

export default Sidebar;
