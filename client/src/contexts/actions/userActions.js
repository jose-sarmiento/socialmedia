import axios from 'axios';
import * as users from '../constants/userConstants';

import {USER_STORAGE_KEY} from '../usersContext'

export const viewUserProfile =
	({ userId, token }) =>
	async dispatch => {
		dispatch({ type: users.getProfileRequested });
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			dispatch({ type: users.getProfileSuccess, payload: data });
		} catch (error) {
			dispatch({
				type: users.getProfileFailed,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const getUserDetails =
	({ userId, token }) =>
	async dispatch => {
		dispatch({ type: users.getUserRequested });
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);			

			dispatch({ type: users.getUserSuccess, payload: data });
			localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: users.getUserFailed,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const updateUser =
	({ userId, update ,token }) =>
	async dispatch => {
		dispatch({ type: users.updateUserRequested });
		try {
			const { data } = await axios.patch(
				`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`,
				update,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			dispatch({ type: users.updateUserSuccess, payload: data.user });
		} catch (error) {
			dispatch({
				type: users.updateUserFailed,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};


export const uploadCover = ({formData, token}) => async dispatch => {
	dispatch({ type: users.uploadCoverRequested });
	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		};

		const {data} = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/users/cover`,
			formData,
			config
		);
		dispatch({type: users.uploadCoverSuccess, payload: data})
	} catch (error) {
		dispatch({
			type: users.uploadCoverFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const uploadProfile = ({formData, token}) => async dispatch => {
	dispatch({ type: users.uploadProfileRequested });
	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		};

		const {data} = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/users/profile`,
			formData,
			config
		);
		dispatch({type: users.uploadProfileSuccess, payload: data})
	} catch (error) {
		dispatch({
			type: users.uploadProfileFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getUsers = ({token}) => async dispatch => {
	dispatch({ type: users.getUsersRequested });
	try {
		const {data} = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/users`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		console.log(data)
		dispatch({type: users.getUsersSuccess, payload: data})
	} catch (error) {
		dispatch({
			type: users.getUsersFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
}

export const getFriends = ({userId, token}) => async dispatch => {
	dispatch({ type: users.getFriendsRequested });
	try {
		const {data} = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/friends`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch({type: users.getFriendsSuccess, payload: data.friends})
	} catch (error) {
		dispatch({
			type: users.getFriendsFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
}

export const addNewFriend = ({recipientId, token}) => async dispatch => {
	dispatch({ type: users.addFriendRequested });
	try {
		const {data} = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/users/${recipientId}/friends`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			} 
		);
		console.log(data)
		dispatch({type: users.addFriendSuccess, payload: data})
	} catch (error) {
		dispatch({
			type: users.addFriendFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
}

export const confirmRequest = ({friend, token}) => async dispatch => {
	dispatch({type: users.confirmFriendRequested})
	try {
		const {data} = await axios.put(
			`${process.env.REACT_APP_API_ENDPOINT}/users/${friend._id}/friends`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch({type: users.confirmFriendSuccess, payload: {response: data, friend}})
	} catch (error) {
		dispatch({
			type: users.confirmFriendFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
}

export const rejectRequest = ({userId, token}) => async dispatch => {
	dispatch({type: users.rejectFriendRequested})
	try {
		const {data} = await axios.delete(
			`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/friends`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch({type: users.rejectFriendSuccess, payload: {...data, userId}})
	} catch (error) {
		dispatch({
			type: users.rejectFriendFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
}




