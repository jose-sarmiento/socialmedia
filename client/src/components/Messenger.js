import React, { useState, useEffect } from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import Chat from "./Chat";
import ConversationList from "./ConversationList";
import ActivePeopleList from "./ActivePeopleList";
import Conversation from "./Conversation";
import {
	setActiveConversation,
	unsetActiveConversation,
} from "../contexts/constants/messengerConstants";

import { useMessengerContext } from "../contexts";

const Messenger = () => {
	const [activeComponent, setActiveComponent] = useState("conversation");
	const { conversations, dispatch, onlines } = useMessengerContext();

	const handleConversationOpen = (convo) =>
		dispatch({ type: setActiveConversation, payload: convo });

	const handleConversationClose = () => {
		dispatch({ type: unsetActiveConversation });
		setActiveComponent("conversation")
	}

	return (
		<div className="messenger">
			<Conversation close={handleConversationClose} />

			<section className="messenger__header">
				<FaFacebookMessenger className="messenger__icon" />
				<h3 className="messenger__heading">Messenger</h3>
			</section>

			<div className="messenger__buttons">
				<button
					className={
						activeComponent === "conversation"
							? "messenger__button messenger__button--chats messenger__button--active"
							: "messenger__button messenger__button--chats"
					}
					onClick={() => setActiveComponent("conversation")}
				>
					Chats
				</button>
				<button
					className={
						activeComponent === "active"
							? "messenger__button messenger__button--actives messenger__button--active"
							: "messenger__button messenger__button--actives"
					}
					onClick={() => setActiveComponent("active")}
				>
					Active
					<span>{onlines.length !== 0 ? ` (${onlines.length})` : ''}</span>
				</button>
			</div>

			<div className="messenger__body">
				{activeComponent === "conversation" ? (
					<ConversationList
						conversations={conversations}
						open={handleConversationOpen}
						setActiveComponent={setActiveComponent}
					/>
				) : (
					<ActivePeopleList onlines={onlines} open={handleConversationOpen} />
				)}
			</div>
		</div>
	);
};

export default Messenger;
