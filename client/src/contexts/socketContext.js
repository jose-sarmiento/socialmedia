import React, { useContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
	listActiveFriends,
	messageReceived,
	newChatReceived,
	onlineUsersUpdated,
	readMessageInConversation
} from "../store/chats";
import { notificationAdded } from "../store/notifications";
import { friendRequestAdded, friendRequestAccepted } from "../store/users";

const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
	const socket = useRef(io("ws://localhost:8000"));
	const dispatch = useDispatch();

	const users = useSelector(state => state.entities.users);
	const { user, friends } = users;
	const chats = useSelector(state => state.entities.chats);
	const { activeChatId } = chats;
 
	const openChat = chatId => {
		socket.current.emit("event://open-chat", chatId);
	};

	const emitMessage = payload => {
		socket.current.emit("event://send-message", payload);
	};

	const emitChat = ( chat, receiverId ) => {
		socket.current.emit("event://send-new-chat", {chat, receiverId});
	};

	const emitFriendRequest = ({notification, friendRequest}) => {
		socket.current.emit("event://send-friend-request", {notification, friendRequest});
	}

	const emitFriendRequestAccepted = ({notification, friend}) => {
		socket.current.emit("event://accept-friend-request", {notification, friend});
	} 

	const disconnect = (id) => {
		socket.current.emit("event://disconnect", id);
	}
 
	useEffect(() => {
		if (!user) return;

		const payload = _.pick(user, [
			"_id",
			"firstname",
			"lastname",
			"profileImage",
		]);
		socket.current.emit("event://setup", payload);
	}, [user]);

	useEffect(() => {
		socket.current.on("event://get-users", online_users => {
			dispatch(onlineUsersUpdated(online_users))
		})

		socket.current.on("event://receive-message", payload => {
			const { conversationId, message } = payload
			dispatch(readMessageInConversation(conversationId, message._id))
			dispatch(messageReceived(payload));
		});

		socket.current.on("event://receive-new-chat", chat => {
			dispatch(newChatReceived(chat))
		});

		socket.current.on("event://receive-friend-request", ({notification, friendRequest}) => {
			dispatch(friendRequestAdded({ friendRequest: friendRequest}))
			dispatch(notificationAdded(notification));
		})

		socket.current.on("event://receive-accept-friend-request", ({notification, friend}) => {
			dispatch(friendRequestAccepted({ friend: friend}))
			dispatch(notificationAdded(notification));
		})
	}, []);

	return (
		<SocketContext.Provider
			value={{
				socket,
				openChat,
				emitMessage,
				emitChat,
				emitFriendRequest,
				emitFriendRequestAccepted,
				disconnect
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocketContext = () => {
	return useContext(SocketContext);
};
