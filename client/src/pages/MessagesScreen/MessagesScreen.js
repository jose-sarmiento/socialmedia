import React, { useState } from "react";
import { FaSearch, FaTelegramPlane } from "react-icons/fa";
import { FiPaperclip, FiSmile } from "react-icons/fi";
import Picker from "emoji-picker-react";
import { AppLayout } from "../../container";
import { Chat } from "../../components";

import img from "../../assets/img/profiles/d11.jpg";
import "./MessagesScreen.scss";

const MessagesScreen = () => {
	const [chosenEmoji, setChosenEmoji] = useState(null);

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
	};
	return (
		<AppLayout>
			<div className="messages">
				<div className="messages__left">
					<div className="messages__search-container">
						<form className="search">
							<FaSearch className="search__icon" />
							<input
								type="search"
								name="search"
								id="search"
								className="search__input"
								placeholder="Search something..."
							/>
						</form>
					</div>

					<div className="messages__chat-list">
						<Chat unseen={true} />
						<Chat />
						<Chat />
						<Chat />
						<Chat />
					</div>
				</div>
				<div className="messages__right">
					<div className="messages__list">
						<div className="message">
							<div className="message__user-image">
								<img src={img} alt="k" />
							</div>
							<div className="message__content-wrapper">
								<div className="message__box">
									<p>
										Lorem, ipsum dolor, sit amet consectetur
										adipisicing elit. Excepturi, neque.
									</p>
									<span className="message__time">12:00</span>
								</div>
								<div className="message__box">
									<p>Lorem, ipsum dolor, sit amet</p>
									<span className="message__time">12:00</span>
								</div>
								<div className="message__box">
									<p>Excepturi, neque.</p>
									<span className="message__time">12:00</span>
								</div>
							</div>
						</div>
						<div className="message message--me">
							<div className="message__content-wrapper">
								<div className="message__box">
									<p>
										Lorem, ipsum dolor, sit amet consectetur
										adipisicing elit. Excepturi, neque.
									</p>
									<span className="message__time">12:00</span>
								</div>
								<div className="message__box">
									<p>Lorem, ipsum dolor, sit amet</p>
									<span className="message__time">12:00</span>
								</div>
								<div className="message__box">
									<p>Excepturi, neque.</p>
									<span className="message__time">12:00</span>
								</div>
							</div>
						</div>
					</div>

					<form className="chat-form">
						<div className="chat-form__left">
							<FiSmile />
							<input type="text" placeholder="Type a message" />
							<FiPaperclip />
						</div>
						<button className="chat-form__submit">
							<FaTelegramPlane/>
						</button>
						{/*<Picker onEmojiClick={onEmojiClick} />*/}
					</form>
				</div>
			</div>
		</AppLayout>
	);
};

export default MessagesScreen;
