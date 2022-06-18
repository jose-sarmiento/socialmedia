import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

export default function useFetch(url, page, limit, onSuccess) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    axios({
      method: 'GET',
      url,
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        if (isMounted) {
          if (onSuccess) {
            dispatch(onSuccess({ posts: res.data.docs }));
          }
          setData(res.data.docs);
          setHasNext(res.data.next);
          setHasPrevious(res.data.previous);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
          setError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [auth.token, url, page, limit, onSuccess, dispatch]);

  return {
    data,
    loading,
    error,
    hasNext,
    hasPrevious,
  };
}
