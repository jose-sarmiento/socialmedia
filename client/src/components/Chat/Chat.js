import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { activeChatSelected, readMessagesInConversation } from "../../store/chats";
import { useSocketContext } from "../../contexts/socketContext";

import img from "../../assets/img/profiles/d11.jpg";
import "./Chat.scss";

const Chat = ({ chat, active }) => {
	const [sender, setSender] = useState();
	const [latest, setLatest] = useState();
	const [unseenMessagesCount, setUnseenMessagesCount] = useState(0);

	const auth = useSelector(state => state.auth);
	const chats = useSelector(state => state.entities.chats);
	const dispatch = useDispatch();
	const { openChat } = useSocketContext();

	useEffect(() => {
		setSender(chat.members.find(x => x._id !== auth.user._id));
		const latestChat = [...chat.messages].sort(function (a, b) {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});
		setLatest(latestChat[0]);
		const msgs = chat.messages.filter(x => !x.seenBy.includes(auth.user._id));
		setUnseenMessagesCount(msgs.length);
	}, [chat, auth]);

	const handleChatSelect = () => {
		// set unseen messages to true
		dispatch(activeChatSelected({ chatId: chat._id }));
		if (unseenMessagesCount > 0) {
			dispatch(readMessagesInConversation(chat._id))
		}
		openChat(sender._id);
	};

	function cutIfTooLong(text) {
		const maxlength = 26;
		if (text?.length > maxlength) {
			return text.slice(0, maxlength) + "..."
		}
		return text
	}

	return (
		<div
			className={active ? "chat chat--active" : !latest?.seenBy.includes(auth.user._id) ? "chat chat--unseen" : "chat"}
			onClick={handleChatSelect}
		>
			<figure>
				<img src={sender?.profileImage} />
				{chats.onlineUsers.some(i => i._id === sender?._id) && (
					<span className="indicator"></span>
				)}
			</figure>
			<div className="chat__content">
				<p className="chat__user">
					{sender?.firstname + " " + sender?.lastname}{" "}
					<span className="chat__ago">
						{moment(latest?.createdAt).format("hh:mm")}
					</span>
				</p>
				<p className="chat__text">
					{cutIfTooLong(latest?.text)}{" "}
					{unseenMessagesCount > 0 && (
						<span className="chat__count-new">
							{unseenMessagesCount}
						</span>
					)}
				</p>
			</div>
		</div>
	);
};

export default Chat;
