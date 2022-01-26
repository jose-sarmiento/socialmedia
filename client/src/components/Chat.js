import React, { useState, useEffect } from "react";
import * as timeago from "timeago.js";
import img from "../assets/img/profiles/d2.jpg";
import { useAuthContext, useMessengerContext } from "../contexts";

const Chat = ({ convo, open, seen }) => {
	const [recentMessage, setRecentMessage] = useState();
	const { auth } = useAuthContext();
	const { conversations } = useMessengerContext();

	useEffect(() => {
		const recent = convo.messages.sort(function(a,b){
		  return new Date(b.date) - new Date(a.date);
		})[0]
		setRecentMessage(recent);
	}, [convo, conversations]);

	return (
		<div
			className={seen ? "chat" : "chat chat--unseen"}
			onClick={() => open(convo)}
		>
			<div className="chat__user">
				<img
					className="chat__img"
					src={convo.friend.profileImage}
					alt="user"
				/>
				<span className="chat__active-dot"></span>
			</div>
			<div className="chat__content">
				<span
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<h4 className="chat__username">{`${convo.friend.firstname} ${convo.friend.lastname}`}</h4>
					<span>{timeago.format(recentMessage?.createdAt)}</span>
				</span>
				<p className="chat__message">{`${
					recentMessage?.sender._id === auth._id
						? "You"
						: `${convo.friend.firstname}`
				}: ${recentMessage?.text}`}</p>
			</div>
			{!seen && <i className="chat__white-dot"></i>}
		</div>
	);
};

Chat.defaultProps = {
	seen: true,
};

export default Chat;
