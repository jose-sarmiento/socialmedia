import React from "react";
import { NavLink } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"

const LeftSide = () => {
	const dispatch = useDispatch();

	const links = [
		{ text: "Home", url: "/"},
		{ text: "Profile", url: "/users/me" },
		{ text: "Friends", url: "/friends" },
		{ text: "Pages", url: "/pages" },
	];

	const users = useSelector(state => state.entities.users);
	const { friends, birthdays } = users;

	return (
		<div className="left-content">
			<div className="tabs">
				<h3 className="tabs__heading mt-1">Menu</h3>
				<div className="tabs__group">
					{links.map((link, idx) => (
						<NavLink
							key={idx}
							to={link.url}
							className={({isActive}) =>
								isActive
									? "tabs__tab tabs__tab--active"
									: "tabs__tab"
							}
						>
							{link.text}
						</NavLink>
					))}
				</div>
			</div>

			<div className="tabs">
				<h3 className="tabs__heading mt-2">
					Birthdays
					<span className="tabs__count">{`(${birthdays.length})`}</span>
				</h3>
				<div className="birthdays mt-1">
					{birthdays.length === 0 && <p className="birthdays__none">No Birthdays Today</p>}
					{birthdays.slice(0, 6).map((celebrant) => (
						<img
							src={celebrant.profileImage}
							alt="profile"
							className="birthdays__img"
						/>
					))}
					{birthdays.length - 6 > 0 && (
						<span className="birthdays__count">{`${
							birthdays.length - 6
						} more`}</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default LeftSide;
