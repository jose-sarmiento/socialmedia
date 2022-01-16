import axios from 'axios';
import * as posts from '../constants/postConstants';

export const createPost =
    ({ formData, token }) =>
    async dispatch => {
        dispatch({ type: posts.createPostRequested });
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                onUploadProgress: progressEvent => {
                    dispatch({
                        type: posts.uploadProgress,
                        payload: parseInt(
                            Math.round(progressEvent.loaded * 100) / progressEvent.total
                        ),
                    });
                },
            };

            await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/posts`, formData, config);

            dispatch({ type: posts.createPostSuccess });
            dispatch({ type: posts.uploadFinished });
        } catch (error) {
            dispatch({
                type: posts.createPostFailed,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
            dispatch({ type: posts.uploadFinished });
        }
    };

export const getPost =
    ({ postId, token }) =>
    async dispatch => {
        dispatch({ type: posts.getPostRequested });
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_ENDPOINT}/posts/${postId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            dispatch({ type: posts.getPostSuccess, payload: data });
        } catch (error) {
            dispatch({
                type: posts.getPostFailed,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };


