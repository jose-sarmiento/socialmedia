import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { listPostsSuccess } from "../store/posts";

export default function usePaginatePosts(page, limit) {
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
         url: '/posts',
         params: { page: page, limit: limit },
         headers: {
            Authorization: `Bearer ${auth.token}`,
         },
      })
         .then(res => {
            if(isMounted) {
               dispatch(listPostsSuccess({posts: res.data.docs}))
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
   }, [page, limit]);

   return { loading, error, hasNext, hasPrevious };
}
