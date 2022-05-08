import axios from "axios";
import { createSlice, createSelector } from "@reduxjs/toolkit";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const slice = createSlice({
	name: "posts",
	initialState: {
		post: null,
		list: [],
		myPosts: [],
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
			posts.myPosts.push(action.payload.post);
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
		listPostsSuccess: (posts, action) => {
			posts.loading.list = false;
			posts.list = [...new Set([...posts.list, ...action.payload.posts])];
		},
		listMyPostsSuccess: (posts, action) => {
			posts.loading.myPosts = false;
			posts.myPosts = [...new Set([...posts.myPosts, ...action.payload.posts])];
		},
		createCommentRequested: (posts, action) => {
			posts.loading.createComment = true;
			posts.error.createComment = false;
			posts.success.createComment = false;
		},
		createCommentSuccess: (posts, action) => {
			posts.loading.createComment = false;
			posts.success.createComment = true;

			if (posts.post?._id === action.payload.postId) {
				posts.post.comments.push(action.payload.comment);
			} 

			let idx = posts.list.findIndex(
				item => item._id === action.payload.postId
			);
			if (idx >= 0) posts.list[idx].comments.push(action.payload.comment);

			// check if post is in myPosts
			idx = posts.myPosts.findIndex(
				item => item._id === action.payload.postId
			);
			if (idx >= 0) posts.myPosts[idx].comments.push(action.payload.comment);
		},
		createCommentFailed: (posts, action) => {
			posts.loading.createComment = false;
			posts.error.createComment = action.payload.error;
		},
		reactPostRequested: (posts, action) => {
			posts.loading.reactPost = true;
			posts.error.reactPost = false;
			posts.success.reactPost = false;
		},
		reactPostSuccess: (posts, action) => {
			posts.loading.reactPost = false;
			posts.success.reactPost = true;

			// if being viewed
			if (posts.post && posts.post._id === action.payload.postId) {
				const ridx = posts.post.reactions.findIndex(
					item => item.userId === action.payload.reaction.userId
				);

				if (ridx < 0) {
					posts.post.reactions.push(action.payload.reaction);
				} else {
					posts.post.reactions[ridx].reaction =
						action.payload.reaction.reaction;
				}
			}

			let idx = posts.list.findIndex(
				item => item._id === action.payload.postId
			);

			if (idx >= 0) {
				const ridx = posts.list[idx].reactions.findIndex(
					item => item.userId === action.payload.reaction.userId
				);
				if (ridx < 0)
					posts.list[idx].reactions.push(action.payload.reaction);
				else
					posts.list[idx].reactions[ridx].reaction =
						action.payload.reaction.reaction;
			}

			// check if post is in myPosts
			idx = posts.myPosts.findIndex(
				item => item._id === action.payload.postId
			);

			if (idx >= 0) {
				const ridx = posts.myPosts[idx].reactions.findIndex(
					item => item.userId === action.payload.reaction.userId
				);
				if (ridx < 0)
					posts.myPosts[idx].reactions.push(action.payload.reaction);
				else
					posts.myPosts[idx].reactions[ridx].reaction =
						action.payload.reaction.reaction;
			}
		},
		reactPostFailed: (posts, action) => {
			posts.loading.reactPost = false;
			posts.error.reactPost = action.payload.error;
		},
		reactCommentRequested: (posts, action) => {
			posts.loading.reactComment = true;
			posts.error.reactComment = false;
			posts.success.reactComment = false;
		},
		reactCommentSuccess: (posts, action) => {
			posts.loading.reactComment = false;
			posts.success.reactComment = true;

			const idx = posts.post.comments.findIndex(
				item => item._id === action.payload.commentId
			);
			posts.post.comments[idx].reactions.push(action.payload.reaction);
		},
		reactCommentFailed: (posts, action) => {
			posts.loading.reactComment = false;
			posts.error.reactComment = action.payload.error;
		},
		updateReactCommentRequested: (posts, action) => {
			posts.loading.updateReactComment = true;
			posts.error.updateReactComment = false;
			posts.success.updateReactComment = false;
		},
		updateReactCommentSuccess: (posts, action) => {
			posts.loading.updateReactComment = false;
			posts.success.updateReactComment = true;

			const idx = posts.post.comments.findIndex(
				item => item._id === action.payload.commentId
			);
			const ridx = posts.post.comments[idx].reactions.findIndex(x => x.userId === action.payload.reaction.userId);
			posts.post.comments[idx].reactions[ridx].reaction = action.payload.reaction.reaction;
		},
		updateReactCommentFailed: (posts, action) => {
			posts.loading.updateReactComment = false;
			posts.error.updateReactComment = action.payload.error;
		},
	},
});

export const {
	createPostRequested,
	createPostSuccess,
	createPostFailed,
	uploadProgress,
	getPostRequested,
	getPostSuccess,
	getPostFailed,
	listPostsSuccess,
	listMyPostsSuccess,
	createCommentRequested,
	createCommentSuccess,
	createCommentFailed,
	reactPostRequested,
	reactPostSuccess,
	reactPostFailed,
	reactCommentRequested,
	reactCommentSuccess,
	reactCommentFailed,
	updateReactCommentRequested,
	updateReactCommentSuccess,
	updateReactCommentFailed,
} = slice.actions;

export default slice.reducer;

// selectors

// actions to dispatch
export const createPost = post => async (dispatch, getState) => {
	try {
		dispatch(createPostRequested());
		const { auth } = getState();
		const response = await axios({
			method: "post",
			url: "/posts",
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${auth.token}`,
			},
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
		dispatch(createPostSuccess({post: response.data}));
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
		const { auth } = getState();

		const response = await axios({
			headers: { Authorization: `Bearer ${auth.token}` },
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

export const createComment =
	(postId, comment) => async (dispatch, getState) => {
		try {
			dispatch(createCommentRequested());
			const { auth } = getState();

			const response = await axios({
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				},
				url: `/posts/${postId}/comments`,
				data: { comment: comment },
			});

			dispatch(
				createCommentSuccess({
					comment: response.data.comment,
					postId: postId,
				})
			);
		} catch (error) {
			dispatch(
				createCommentFailed({
					error:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				})
			);
		}
	};

export const reactPost = (postId, reaction) => async (dispatch, getState) => {
	try {
		dispatch(reactPostRequested());
		const { auth } = getState();

		const response = await axios({
			method: "put",
			url: `/posts/${postId}/likes`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.token}`,
			},
			data: { reaction: reaction },
		});

		dispatch(
			reactPostSuccess({
				reaction: response.data.reaction,
				postId: postId,
			})
		);
	} catch (error) {
		dispatch(
			reactPostFailed({
				error:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		);
	}
};

export const reactComment = (postId, commentId, reaction) => async (dispatch, getState) => {
	try {
		dispatch(reactCommentRequested());
		const { auth } = getState();

		const response = await axios({
			method: "post",
			url: `/posts/${postId}/comments/${commentId}/likes`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.token}`,
			},
			data: { reaction: reaction },
		});

		dispatch(
			reactCommentSuccess({
				reaction: response.data.reaction,
				postId: postId,
				commentId: commentId,
			})
		);
	} catch (error) {
		dispatch(
			reactCommentFailed({
				error:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		);
	}
};

export const updateReactComment = (postId, commentId, reaction) => async (dispatch, getState) => {
	try {
		dispatch(updateReactCommentRequested());
		const { auth } = getState();

		const response = await axios({
			method: "put",
			url: `/posts/${postId}/comments/${commentId}/likes`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.token}`,
			},
			data: { reaction: reaction },
		});

		dispatch(
			updateReactCommentSuccess({
				reaction: response.data.reaction,
				postId: postId,
				commentId: commentId,
			})
		);
	} catch (error) {
		dispatch(
			updateReactCommentFailed({
				error:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		);
	}
};
