import React, { useEffect, useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Post from "./Post";
import Loader from "./Loader";
import usePaginatePosts from "../hooks/usePaginatePosts";

const PostList = ({ onlyMe, userId, small = false }) => {
   const [page, setPage] = useState(1);
   const [limit] = useState(5);
   const [url, setUrl] = useState(
      `${process.env.REACT_APP_API_ENDPOINT}/posts/`
   );

   const { results, loading, hasNext } = usePaginatePosts(url, page, limit);

   useEffect(() => {
      let isMounted = true;
      if (onlyMe && isMounted) {
         setUrl(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/posts`);
      }

      return () => {
         isMounted = false;
      };
   }, [onlyMe, userId]);

   const observer = useRef();
   const lastElementRef = useCallback(
      (node) => {
         if (loading) return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNext) {
               setPage((prevPage) => prevPage + 1);
            }
         });
         if (node) observer.current.observe(node);
      },
      [loading, hasNext]
   );

   return (
      <>
         {results.map((post, index) => {
            if (results.length === index + 1) {
               return (
                  <Post
                     ref={lastElementRef}
                     post={post}
                     key={uuidv4()}
                     small={small}
                  />
               );
            }
            return <Post post={post} key={uuidv4()} small={small} />;
         })}
         {loading && <Loader />}
      </>
   );
};

export default PostList;
