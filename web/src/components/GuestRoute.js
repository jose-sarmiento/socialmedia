import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GuestRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      return navigate(-1);
    }
  },[auth.user, navigate])

  return children;
}

export default GuestRoute;
