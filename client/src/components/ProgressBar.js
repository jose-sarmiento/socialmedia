import React from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = () => {
   const posts = useSelector(state => state.entities.posts);

   return (
      <div className='meter animate'>
         {posts.uploadPercentage && posts.uploadPercentage > 0 && (
            <span
               style={{
                  width: posts.uploadPercentage ? `${posts.uploadPercentage}%` : '0%',
               }}
            >
               <span
                  style={{
                     width: posts.uploadPercentage ? `${posts.uploadPercentage}%` : '0%',
                  }}
               ></span>
            </span>
         )}
      </div>
   );
};

export default ProgressBar;
