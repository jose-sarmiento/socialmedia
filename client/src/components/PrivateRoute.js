import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!auth.user) return navigate('/login');
  return children;
}

export default PrivateRoute;
