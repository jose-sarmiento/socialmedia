import React, { useContext, useRef, useEffect } from 'react';
import { io } from "socket.io-client";
import {addMessageToConversation} from "./constants/messengerConstants"
import {useMessengerContext} from "./messengerContext"

const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
	const socket = useRef(io("ws://localhost:8000"))
	// const {dispatch} = useMessengerContext()

	// useEffect(() => {
	// 	socket.current.on("getMessage", (data) => {
	// 		if(data.message) {
	// 			dispatch({ type: addMessageToConversation, payload: data })
	// 		}
	// 	});
	// },[])

	return (
		<SocketContext.Provider value={socket} >
			{children}
		</SocketContext.Provider>
	);
};

export const useSocketContext = () => {
	return useContext(SocketContext);
};
