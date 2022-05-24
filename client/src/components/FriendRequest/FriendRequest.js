import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { acceptRequest } from "../../store/users";
import dp from "../../assets/img/profiles/d1.jpg";

const FriendRequest = ({ friend }) => {
	const users = useSelector(state => state.entities.users);
	const dispatch = useDispatch();

	const handleAcceptFriend = () => {
		dispatch(acceptRequest(
			_.pick(friend, [
				"_id",
				"firstname",
				"lastname",
				"profileImage",
				"username"
			])
		))
	}
	return (
		<li className="friend">
			<figure>
				<img src={friend?.profileImage} alt="imgz" />
			</figure>
			<div>
				<Link to={`/users/${friend?._id}`}>
					{friend?.firstname + " " + friend?.lastname}
				</Link>
				<span>@{friend?.username}</span>
			</div>
	
			<button
				disabled={users.loading.accept}
				className={users.loading.accept && "loading"}
				onClick={handleAcceptFriend}
			>
				accept
			</button>
		</li>
	);
};

export default FriendRequest;
