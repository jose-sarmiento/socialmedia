import axios from "axios";

const api =
	({ dispatch }) =>
	(next) =>
	async (action) => {
		if (action.type !== "apiCallBegan") return next(action);

		const { url, method, headers, params, data, onSuccess, onError } =
			action.payload;

		try {
			const response = await axios.request({
				baseURL: process.env.REACT_APP_API_ENDPOINT,
				url,
				method,
				headers,
				params,
				data,
			});

			dispatch({ type: onSuccess, payload: response.data });
		} catch (error) {
			dispatch({
				type: onError,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export default api;
