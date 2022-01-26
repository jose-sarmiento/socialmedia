import React, { useContext, useReducer, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import reducer from './reducers/messengerReducer';
import { addMessageToConversation, setOnlineFriends } from "../contexts/constants/messengerConstants";
import { getConversations } from './actions/messengerActions'
import { useAuthContext } from './authContext'
import { useUsersContext } from './usersContext'

const MessengerContext = React.createContext();
   
const initialState = {
	conversations: [],
	activeConversation: null,
	messages: [],
	onlines: []
};

export const MessengerProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { auth } = useAuthContext()
	const {friends} = useUsersContext()

	const socket = useRef();

	useEffect(() => {
		let isMounted = true;
		socket.current = io("ws://localhost:8000");
		socket.current.on("getMessage", (data) => {
			if (data?._id) {
				dispatch({ type: addMessageToConversation, payload: data });
			}
		});
	}, []);

	useEffect(() => {
		if (!auth) return;
		getConversations({_id: auth._id, token: auth.token})(dispatch)
	},[auth])

	useEffect(() => {
		if(!auth) return;

		socket.current.emit("addUser", auth._id);
		socket.current.on("getUsers", (users) => {
			if(users.length === 0 || friends.length === 0) return;
			const ids = users.map(x => x.userId)
			const activeUsers = friends.filter(user => {
				return ids.includes(user._id)
			})
			dispatch({type: setOnlineFriends, payload: activeUsers})
		});

		// users = [{socketId, userId}]

		// const myFriends = friends.map((x) => x._id)
		// socket.current.emit("sendFriends", myFriends);
		// socket.current.on("getActiveFriends", (actives) => {
		// 	if(actives.length === 0 || friends.length === 0) return;
		// 	const activeFriends = actives?.map(active => {
		// 		return friends.find(friend => friend._id == active.userId)
		// 	})
		// 	dispatch({type: setOnlineFriends, payload: activeFriends})
		// })
	}, [auth, friends]);

	return (
		<MessengerContext.Provider value={{ 
			...state, 
			dispatch,
			socket
		}} >
			{children}
		</MessengerContext.Provider>
	);
};

export const useMessengerContext = () => {
	return useContext(MessengerContext);
};
