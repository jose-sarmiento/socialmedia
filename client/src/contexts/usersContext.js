import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducers/userReducer';
import { getUserDetails, getUsers, getFriends } from './actions/userActions'
import { useAuthContext } from './authContext'

const UsersContext = React.createContext();

export const USER_STORAGE_KEY = 'socialmedia_userinfo';

const userFromStorage = localStorage.getItem(USER_STORAGE_KEY)
	? JSON.parse(localStorage.getItem(USER_STORAGE_KEY))
	: null;
   
const initialState = {
	user: userFromStorage,
	profile: null,
	people: [],
	friendRequests: [],
	friends: []
};

export const UsersProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { auth } = useAuthContext()

	useEffect(() => {
		if (!auth) return;
		getUserDetails({userId: auth._id, token: auth.token})(dispatch)
		getUsers({token: auth.token})(dispatch)
	},[auth])

	return (
		<UsersContext.Provider value={{ ...state, dispatch}} >
			{children}
		</UsersContext.Provider>
	);
};

export const useUsersContext = () => {
	return useContext(UsersContext);
};
