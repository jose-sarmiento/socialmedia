import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux"

const PrivateRoute = ({ children, ...rest }) => {
	const auth = useSelector(state => state.auth);

	return (
		<Route
			{...rest}
			render={({ location }) =>
				(auth.user) ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
