import axios from "axios";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import _ from "lodash";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const slice = createSlice({
	name: "notifications",
	initialState: {
		list: [],
		loading: {},
		success: {},
		error: {},
	},
	reducers: {
		listNotificationsRequested: (notifications, action) => {
			notifications.loading.list = true;
			notifications.error.list = null;
		},
		listNotificationsSuccess: (notifications, action) => {
			notifications.loading.list = false;
			notifications.list = action.payload.list;
		},
		listNotificationsFailed: (notifications, action) => {
			notifications.loading.list = false;
			notifications.error.list = "Something wen't wrong";
		},
		createNotificationRequested: (notifications, action) => {
			notifications.loading.create = true;
			notifications.error.create = null;
		},
		createNotificationSuccess: (notifications, action) => {
			notifications.loading.create = false;
			notifications.createdNotification = action.payload.createdNotification;
		},
		createNotificationFailed: (notifications, action) => {
			notifications.loading.create = false;
			notifications.error.create = "Something wen't wrong";
		},
		createNotificationReset: (notifications, action) => {
			notifications.createdNotification = null
		},
		notificationAdded: (notifications, action) => {
			notifications.list.unshift(action.payload);
		},
		updateNotificationRequested: (notifications, action) => {
			notifications.loading.update = true;
			notifications.error.update = null;
			notifications.success.update = false;
		},
		updateNotificationSuccess: (notifications, action) => {
			notifications.loading.update = false;
			notifications.success.update = true;
			const idx = notifications.list.findIndex(x => x._id === action.payload.update._id);
			notifications.list[idx] = {...notifications.list[idx], ...action.payload.update};
		},
		updateNotificationFailed: (notifications, action) => {
			notifications.loading.update = false;
			notifications.error.update = "Something wen't wrong";
		},
		updateNotificationReset: (notifications, action) => {
			notifications.success.update = false;
		},
		readAllNotificationsRequested: (notifications, action) => {
			notifications.loading.readAll = true;
			notifications.success.readAll = false;
			notifications.error.readAll = null;
		},
		readAllNotificationsSuccess: (notifications, action) => {
			notifications.loading.readAll = false;
			notifications.success.readAll = true;
			notifications.list = notifications.list.map(x => {
				if(!x.isRead) {
					return {
						...x,
						isRead: true
					}
				}
				return x;
			})
		},
		readAllNotificationsFailed: (notifications, action) => {
			notifications.loading.readAll = false;
			notifications.error.readAll = "Something wen't wrong";
		},	
	},
});

export const { 
	listNotificationsRequested,
	listNotificationsSuccess,
	listNotificationsFailed,
	createNotificationRequested,
	createNotificationSuccess,
	createNotificationFailed,
	createNotificationReset,
	notificationAdded,
	updateNotificationRequested,
	updateNotificationSuccess,
	updateNotificationFailed,
	updateNotificationReset,
	readAllNotificationsRequested,
	readAllNotificationsSuccess,
	readAllNotificationsFailed
} = slice.actions;

export default slice.reducer;

export const getAllNotifications = () => async (dispatch, getState) => {
	try {
		dispatch(listNotificationsRequested())
		const { auth } = getState();
		const { data } = await axios({
			method: "get",
	        url: `/notifications`,
	        headers: { Authorization: `Bearer ${auth.token}` },
	    });
	    dispatch(listNotificationsSuccess({ list: data }))
	} catch(error) {
		dispatch(listNotificationsFailed())
	}
};

export const createNotification = ({recipientId, type}) => async (dispatch, getState) => {
	try {
		dispatch(createNotificationRequested())
		const { auth, entities } = getState();
		const { data } = await axios({
	        method: "post",
	        url: `/notifications`,
	        headers: { Authorization: `Bearer ${auth.token}` },
	        data: {
	            to: recipientId,
	            from: _.pick(entities.users.user, ['_id', 'firstname', 'lastname', 'middlename', 'username', 'profileImage', 'birthdate', 'sex']),
	            type: type,
	        },
	    });
	    dispatch(createNotificationSuccess({ createdNotification: data }))
	} catch(error) {
		dispatch(createNotificationFailed(error))
	}
}; 

export const updateNotification = (notificationId, update) => async (dispatch, getState) => {
	try {
		dispatch(updateNotificationRequested())
		const { auth } = getState();
		const { data } = await axios({
	        method: "patch",
	        url: `/notifications/${notificationId}`,
	        headers: { Authorization: `Bearer ${auth.token}` },
	        data: update
	    });
	    dispatch(updateNotificationSuccess({
	    	update: {
		    	_id: notificationId,
		    	...update
		    }
		}))
	} catch(error) {
		dispatch(updateNotificationFailed(error))
	}
} 

export const readALlNotifications = () => async (dispatch, getState) => {
	try {
		dispatch(readAllNotificationsRequested())
		const { auth } = getState();
		await axios({
	        method: "patch",
	        url: `/notifications/readall`,
	        headers: { Authorization: `Bearer ${auth.token}` }
	    });
	    dispatch(readAllNotificationsSuccess())
	} catch(error) {
		dispatch(readAllNotificationsFailed(error))
	}
} 