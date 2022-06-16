import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.auth);

  if (!auth.user) {
    return <Navigate to='/login' />;
  }

  return children;
}

export default PrivateRoute;
