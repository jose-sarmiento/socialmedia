import axios from "axios";
import { createSlice, createSelector } from "@reduxjs/toolkit";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
const defaultHeaders = token => ({
	headers: {
		"Content-Type": "multipart/form-data",
		Authorization: `Bearer ${token}`,
	},
});

const slice = createSlice({
	name: "posts",
	initialState: {
		post: null,
		list: [],
		loading: {},
		error: {},
		success: {},
	},
	reducers: {
		createPostRequested: (posts, action) => {
			posts.loading.create = true;
			posts.error.create = false;
			posts.success.create = false;
		},
		createPostSuccess: (posts, action) => {
			posts.loading.create = false;
			posts.success.create = true;
			posts.uploadPercentage = null;
		},
		createPostFailed: (posts, action) => {
			posts.loading.create = false;
			posts.error.create = action.payload.error;
		},
		uploadProgress: (posts, action) => {
			posts.uploadPercentage = action.payload.progress;
		},
		getPostRequested: (posts, action) => {
			posts.loading.get = true;
			posts.error.get = false;
		},
		getPostSuccess: (posts, action) => {
			posts.loading.get = false;
			posts.post = action.payload.post;
		},
		getPostFailed: (posts, action) => {
			posts.loading.get = false;
			posts.error.get = action.payload.error;
		},
		listPostsRequested: (posts, action) => {
			posts.loading.list = true;
			posts.error.list = false;
		},
		listPostsSuccess: (posts, action) => {
			posts.loading.list = false;
			posts.list.push(action.payload.posts);
		},
		listPostsFailed: (posts, action) => {
			posts.loading.list = false;
			posts.error.list = action.payload.error;
		},
	},
});

const {
	createPostRequested,
	createPostSuccess,
	createPostFailed,
	uploadProgress,
	getPostRequested,
	getPostSuccess,
	getPostFailed,
	listPostsRequested,
	listPostsSuccess,
	listPostsFailed,
} = slice.actions;

export default slice.reducer;

// selectors

// actions to dispatch
export const createPost = post => async (dispatch, getState) => {
	try {
		dispatch(createPostRequested());
		const { auth } = getState();
		const response = await axios({
			...defaultHeaders(auth.token),
			method: "post",
			url: "/posts",
			data: post,
			onUploadProgress: progressEvent => {
				dispatch(
					uploadProgress({
						progress: parseInt(
							Math.round(progressEvent.loaded * 100) /
								progressEvent.total
						),
					})
				);
			},
		});
		dispatch(createPostSuccess(response.data));
	} catch (error) {
		dispatch(
			createPostFailed({
				error:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		);
	}
};

export const getPost = id => async (dispatch, getState) => {
	try {
		dispatch(getPostRequested());
		const auth = getState();

		const response = await axios({
			...defaultHeaders(auth.token),
			url: `/posts/${id}`,
		});

		dispatch(getPostSuccess({ post: response.data }));
	} catch (error) {
		dispatch(
			getPostFailed({
				error:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		);
	}
};
