import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { addFriend } from "../../store/users";
import { createNotification } from "../../store/notifications";

import "./AddFriend.scss";

const AddFriend = ({ friend }) => {
	const users = useSelector(state => state.entities.users);
	const dispatch = useDispatch();
 
	const handleAddFriend = () => {
		dispatch(createNotification({recipientId: friend._id, type: "add-friend" }))
		dispatch(addFriend( 
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
				<img src={friend?.profileImage} alt={friend?.firstname + " picture"} />
			</figure>
			<div>
				<Link to={`/users/${friend?._id}`}>
					{friend?.firstname + " " + friend?.lastname}
				</Link>
				<span>@{friend?.username}</span>
			</div>
			{friend?.isPending ? (
				<button className="sent">sent</button>
			) : (
				<button
					disabled={users.loading.add}
					className={users.loading.add ? "loading" : ""}
					onClick={handleAddFriend}
				>
					add friend
				</button>
			)}
		</li>
	);
};

export default AddFriend;
