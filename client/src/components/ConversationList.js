import React from "react";
import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom"
import Conversation from "./Conversation";
import Chat from "./Chat";

const ConversationList = ({ conversations, open, setActiveComponent }) => {

	if(conversations.length === 0) {
		return (
			<div className="messenger__empty">
				<h2>No conversations</h2>
				<button
					onClick={() => setActiveComponent('active')}
				>Start Chat</button>
			</div>
		)
	}
	return (
		<>
			<div className="messenger__chats">
				{conversations.map((convo) => (
					<Chat convo={convo} open={open} key={convo._id} />
				))}
			</div>
			<div className="messenger__footer">
				<form className="messenger__search-form">
					<label
						htmlFor="messenger__search"
						className="messenger__search-label"
					>
						<FaSearch />
					</label>
					<input
						type="text"
						id="messenger__search"
						className="messenger__search"
					/>
				</form>
			</div>
		</>
	);
};

export default ConversationList;
