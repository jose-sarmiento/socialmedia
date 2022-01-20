import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../contexts';

const PrivateRoute = ({ children, ...rest }) => {
	const { auth, user, profile } = useAuthContext();

	return (
		<Route
			{...rest}
			render={({ location }) =>
				(auth) ? (
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
