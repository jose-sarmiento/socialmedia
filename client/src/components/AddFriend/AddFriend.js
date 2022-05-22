import React from "react";
import { Link } from "react-router-dom";
import "./AddFriend.scss";
import dp from "../../assets/img/profiles/d1.jpg";

const AddFriend = ({ friend, addFriend }) => {

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
			{friend.isPending ? (
				<button className="sent">
					sent
				</button>
			) : (
				<button onClick={() => addFriend(friend._id)}>
					add friend
				</button>
			)}
		</li>
	);
};

export default AddFriend;
