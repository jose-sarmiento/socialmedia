import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Conversation from "./Conversation";
import Chat from "./Chat";

const ConversationList = ({ conversations, open, setActiveComponent }) => {
	const [sortedConversations, setSortedConversations] = useState([]);
	const [keyword, setKeyword] = useState('')

	useEffect(() => {
		let sorted = conversations.sort(function (a, b) {
			return (
				new Date(b.messages[b.messages.length - 1].createdAt) -
				new Date(a.messages[a.messages.length - 1].createdAt)
			);
		});


		if(keyword && keyword !== '') {
			var pattern = `${keyword}`;
			const re = new RegExp(pattern,"g")
			sorted = sorted.filter(x => re.test(`${x.friend.firstname} ${x.friend.lastname}`))
		}

		setSortedConversations(sorted)
	}, [conversations, keyword]);


	if (conversations.length === 0) {
		return (
			<div className="messenger__empty">
				<h2>No conversations</h2>
				<button onClick={() => setActiveComponent("active")}>
					Start Chat
				</button>
			</div>
		);
	}

	return (
		<>
			<div className="messenger__chats">
				{sortedConversations.map((convo) => (
					<Chat convo={convo} open={open} key={convo._id} />
				))}
			</div>
			<div className="messenger__footer">
				<form className="messenger__search-form" onSubmit={e => e.preventDefault()}>
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
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
				</form>
			</div>
		</>
	);
};

export default ConversationList;
