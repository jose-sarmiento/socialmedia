import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../contexts';

export default function useFetch(url) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	const {auth} = useAuthContext();

	useEffect(() => {
		setLoading(true);
		setError(false);

		axios({
			method: 'GET',
			url: url,
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		})
			.then(res => {
				setData(res.data);
				setLoading(false);
			})
			.catch(e => {
				setLoading(false);
				setError(true);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return { loading, error, data };
}
