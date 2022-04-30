import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function usePaginateFetch(url, page, limit) {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [results, setResults] = useState([]);
   const [hasNext, setHasNext] = useState(false);
   const [hasPrevious, setHasPrevious] = useState(false);

   const auth = useSelector(state => state.auth);

   useEffect(() => {
      let isMounted = true;
      setLoading(true);
      setError(false);

      axios({
         method: 'GET',
         url: url,
         params: { page: page, limit: limit },
         headers: {
            Authorization: `Bearer ${auth.token}`,
         },
      })
         .then(res => {
            if(isMounted) {
               setResults(prevResults => {
                  return [...new Set([...results, ...res.data.docs])];
               });
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
   }, [url, page, limit]);

   return { loading, error, results, hasNext, hasPrevious };
}
