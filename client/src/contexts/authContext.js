import React, { useContext, useReducer } from 'react';
import reducer from './reducers/authReducer';

const AuthContext = React.createContext();

export const AUTH_STORAGE_KEY = 'socialmedia_auth';

const authFromStorage = localStorage.getItem(AUTH_STORAGE_KEY)
	? JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY))
	: null;

const initialState = {
	auth: authFromStorage,
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AuthContext.Provider
			value={{
				...state,
				dispatch
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
