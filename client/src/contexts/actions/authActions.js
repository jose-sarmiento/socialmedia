import axios from 'axios';
import * as auth from '../constants/authConstants'

import { AUTH_STORAGE_KEY } from '../authContext';
import { USER_STORAGE_KEY } from '../usersContext';

export const login = formData => async dispatch => {
	dispatch({ type: auth.loginRequested });
	try {
		const { data, headers } = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
			formData,
			{ 'Content-Type': 'application/json' }
		);

		const payload = { ...data, token: headers['x-auth-token'] };
		dispatch({ type: auth.loginSuccess, payload });
		localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
	} catch (error) {
		dispatch({
			type: auth.loginFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const register = formData => async dispatch => {
	dispatch({ type: auth.registerRequested });
	try {
		const { data, headers } = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/auth/register`,
			formData,
			{ 'Content-Type': 'application/json' }
		);

		const payload = { ...data, token: headers['x-auth-token'] };
		dispatch({ type: auth.registerSuccess, payload });
		localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
	} catch (error) {
		dispatch({
			type: auth.registerFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => dispatch => {
	dispatch({ type: auth.logout });
	localStorage.removeItem(AUTH_STORAGE_KEY);
	localStorage.removeItem(USER_STORAGE_KEY);
};
