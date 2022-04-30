import React, { useEffect, useState, useRef } from "react";
import { FaFacebookMessenger, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import Message from "./Message";
import {
	getMessagesInConversation,
	createMessage,
} from "../contexts/actions/messengerActions";
import {useSelector} from "react-redux"

import { useMessengerContext, useSocketContext } from "../contexts";

const Conversation = ({ close }) => {
	const [message, setMessage] = useState("");

	const auth = useSelector(state => state.auth);

	const socket = useSocketContext()
	const { 
		activeConversation, 
		messages, 
		createMessageSuccess, 
		dispatch 
	} = useMessengerContext();

	const scrollRef = useRef()

	useEffect(() => {
		if (!activeConversation) return;
		if(activeConversation._id === null) return;
		getMessagesInConversation({
			convoId: activeConversation._id,
			token: auth.token,
		})(dispatch); 
	}, [activeConversation]);

	useEffect(() => {
		if (!activeConversation) return;
		socket.current.emit("sendMessage", {
			receiverId: activeConversation.friend._id,
			chat: createMessageSuccess,
		});
		setMessage("");
	}, [socket, createMessageSuccess]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView()
	},[messages])

	const handleInputChange = (e) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createMessage({
			convoId: activeConversation._id,
			senderId: auth.user._id,
			receiverId: activeConversation.friend._id,
			message,
			token: auth.token,
		})(dispatch);
	};

	return (
		<>
			<div
				className={
					activeConversation
						? "conversation conversation--active"
						: "conversation"
				}
			>
				<section className="conversation__header">
					<FaArrowLeft
						className="conversation__back-icon"
						onClick={() => close()}
					/>
					<h3 className="messenger__heading">
						{activeConversation &&
							`${activeConversation.friend.firstname} ${activeConversation.friend.lastname}`}
					</h3>
				</section>

				<section className="conversation__body">
					{messages.map((message) => (
						<Message chat={message} key={message._id} ref={scrollRef} />
					))}
				</section>

				<section className="conversation__footer">
					<form className="chat-form" onSubmit={handleSubmit}>
						<textarea
							name="message"
							spellCheck="false"
							placeholder="Type here..."
							className="chat-form__input"
							onChange={handleInputChange}
							value={message}
						></textarea>
						<button type="submit" className="chat-form__submit">
							<FaPaperPlane className="chat-form__submit-icon" />
						</button>
					</form>
				</section>
			</div>
		</>
	);
};

export default Conversation;
