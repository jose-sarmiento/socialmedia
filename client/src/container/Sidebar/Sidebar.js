import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux"
import { HiHome, HiUser, HiUsers, HiBell } from "react-icons/hi";

import "./Sidebar.scss"

const Sidebar = () => {

	const links = [
		{ text: "Home", url: "/", icon: <HiHome /> },
		{ text: "Profile", url: "/users/me", icon: <HiUser /> },
		{ text: "Friends", url: "/friends", icon: <HiUsers /> },
		{ text: "Notifications", url: "/notifications", icon: <HiBell /> },
		{ text: "Messages", url: "/messages", icon: <HiBell /> },
	];

	const users = useSelector(state => state.entities.users);
	const { birthdays } = users;

	return (
		<div className="sidebar">
			<ul className="sidebar__links">
				{links.map((link, idx) => (
					<li className="sidebar__link-item">
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
				<button className="btn btn--outline mt-2">Log out</button>
			</div>
		</div>
	);
};

export default Sidebar;
