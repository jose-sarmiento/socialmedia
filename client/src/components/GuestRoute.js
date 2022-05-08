import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"

const GuestRoute = ({ children }) => {
	const auth = useSelector(state => state.auth);

	if (auth.user) return <Navigate to={-1} />;
	return children;
};

export default GuestRoute