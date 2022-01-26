import React from "react";
import { useAuthContext } from "../contexts";

const Message = React.forwardRef((props, ref ) => {
	const { auth } = useAuthContext();
	return (
		<div
			className={
				props.chat.sender._id === auth._id ? "message message--me" : "message"
			}
			ref={ref}
		>
			{props.chat.sender._id !== auth._id && (
				<figure className="message__image">
					<img src={props.chat.sender.profileImage} />
				</figure>
			)}
			<div
				className={
					props.chat.sender._id === auth._id
						? "message__body message__body--me"
						: "message__body"
				}
			>
				<p className="message__content">{props.chat.text}</p>
			</div>
		</div>
	);
});

export default Message;
