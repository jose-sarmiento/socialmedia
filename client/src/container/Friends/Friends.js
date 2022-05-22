import React from "react";
import { FiMessageCircle, FiUsers } from "react-icons/fi";
import { Link} from "react-router-dom";
import { Friend } from "../../components";

import "./Friends.scss";
import img from "../../assets/img/profiles/d11.jpg";

const Friends = ({friends}) => {
	return (
		<div className="section-container friends">
			<div className="section-container__header">
				<div className="d-flex">
					<FiUsers className="section-container__heading-icon" />
					<h4>Friends</h4>
				</div>
			</div>

			<div className="section-container__body friends__body">
				<ul className="friends__list">
					{friends.map(friend => <Friend friend={friend} key={friend._id} />)}
				</ul>
			</div>
		</div>
	);
};

export default Friends;
