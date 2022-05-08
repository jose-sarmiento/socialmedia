import React, { useState, useEffect } from "react";
import {
	FaAngry,
	FaHeart,
	FaLaugh,
	FaSurprise,
	FaThumbsUp,
} from "react-icons/fa";
import PopupReactions from "./PopupReactions";
import snake from '../assets/img/snake.gif'

const ReactButton = ({ userReaction = 'unlike', react, loading }) => {
	const [isShowing, setIsShowing] = useState(false);

	

	function toggleIsShowing() {
		setIsShowing((prev) => !prev);
	}

	function handleReactSelect(value) {
		react(value)
	}

	return (
		<button
			disabled={loading}
			className={`post__action post__action--${userReaction}`}
			onClick={() => setIsShowing((prev) => !prev)}
		>
			<PopupReactions isShowing={isShowing} select={handleReactSelect} />
			{userReaction === "love" ? (
				<FaHeart className="post__action-icon" data-react="love" />
			) : userReaction === "laugh" ? (
				<FaLaugh
					className="post__action-icon post__action-icon--laugh"
					data-react="laugh"
				/>
			) : userReaction === "angry" ? (
				<FaAngry
					className="post__action-icon post__action-icon--angry"
					data-react="angry"
				/>
			) : userReaction === "wow" ? (
				<FaSurprise
					className="post__action-icon post__action-icon--wow"
					data-react="wow"
				/>
			) : userReaction === "like" ? (
				<FaThumbsUp
					className="post__action-icon post__action-icon--like"
					data-react="like"
				/>
			) : (
				<FaThumbsUp className="post__action-icon" />
			)}
		</button>
	);
};

export default ReactButton;
