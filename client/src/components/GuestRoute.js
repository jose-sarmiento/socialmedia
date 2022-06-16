import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GuestRoute({ children }) {
  const auth = useSelector((state) => state.auth);

  if (auth.user) {
    return <Navigate to='/' />;
  }

  return children;
}

export default GuestRoute;
