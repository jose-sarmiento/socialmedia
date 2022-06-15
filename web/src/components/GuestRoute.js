import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GuestRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (auth.user) {
    return navigate(-1);
  }

  return children;
}

export default GuestRoute;
