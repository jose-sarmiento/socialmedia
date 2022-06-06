import React from "react";
import "./ChatBubble.scss";

const ChatBubble = ({name}) => {
	return (
		<div className="bubble">
			<div class="typing">
				<div class="dot"></div>
				<div class="dot"></div>
				<div class="dot"></div>
				<div className="ml-1">{`${name} is typing`}</div>
			</div>
		</div>
	);
};

export default ChatBubble;
