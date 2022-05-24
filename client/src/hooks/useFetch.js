import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

export default function useFetch(url, page, limit, onSuccess) {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [hasNext, setHasNext] = useState(false);
   const [hasPrevious, setHasPrevious] = useState(false);

   const auth = useSelector(state => state.auth);
   const dispatch = useDispatch();

   useEffect(() => {
      let isMounted = true;
      setLoading(true);
      setError(false);

      axios({
         baseURL: process.env.REACT_APP_API_ENDPOINT,
         method: 'GET',
         url: url,
         params: { page: page, limit: limit },
         headers: {
            Authorization: `Bearer ${auth.token}`,
         },
      })
         .then(res => {
            if(isMounted) {
            	if (onSuccess) {
	               dispatch(onSuccess({posts: res.data.docs}))
	           }
	           setData(res.data.docs)
               setHasNext(res.data.next);
               setHasPrevious(res.data.previous);
               setLoading(false);
            }
         })
         .catch(e => {
            if(isMounted) {
               setLoading(false);
               setError(true);
            }
         });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => { isMounted = false }
   }, [url, page, limit, onSuccess]);

   return { data, loading, error, hasNext, hasPrevious };
}
