import React, { useContext, useReducer, useEffect, useRef } from 'react';
import reducer from './reducers/messengerReducer';
import { addMessageToConversation, setOnlineFriends, addConversationWithMessage } from "../contexts/constants/messengerConstants";
import { getConversations } from './actions/messengerActions'
import { useSocketContext } from './socketContext'
import {useSelector} from "react-redux"

const MessengerContext = React.createContext();
   
const initialState = {
	conversations: [],
	activeConversation: null,
	messages: [],
	onlines: []
};

export const MessengerProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const auth = useSelector(state => state.auth);
	const friends = useSelector(state => state.entities.users.friends)

	const socket = useSocketContext()

	useEffect(() => {
		socket.current.on("getMessage", (data) => {

			if (data.message) {
				if(data.createdConversation) {
					dispatch({ type: addConversationWithMessage, payload: data });
				} else {
					dispatch({ type: addMessageToConversation, payload: data });
				}
			}
		});
	}, []);

	useEffect(() => {
		if (!auth.user) return;
		getConversations({_id: auth.user._id, token: auth.token})(dispatch)
	},[auth.user]) 

	useEffect(() => {
		if(!auth.user) return;

		socket.current?.emit("addUser", auth.user._id);
		socket.current?.on("getUsers", (users) => {
			if(users.length === 0 || friends.length === 0) return;
			const ids = users.map(x => x.userId)
			const activeUsers = friends.filter(user => {
				return ids.includes(user._id)
			})
			dispatch({type: setOnlineFriends, payload: activeUsers})
		});

		// users = [{socketId, userId}]

		// const myFriends = friends.map((x) => x._id)
		// socket.emit("sendFriends", myFriends);
		// socket.on("getActiveFriends", (actives) => {
		// 	if(actives.length === 0 || friends.length === 0) return;
		// 	const activeFriends = actives?.map(active => {
		// 		return friends.find(friend => friend._id == active.userId)
		// 	})
		// 	dispatch({type: setOnlineFriends, payload: activeFriends})
		// })
	}, [socket, auth, friends]);

	return (
		<MessengerContext.Provider value={{ 
			...state, 
			dispatch,
		}} >
			{children}
		</MessengerContext.Provider>
	);
};

export const useMessengerContext = () => {
	return useContext(MessengerContext);
};
