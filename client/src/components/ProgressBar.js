import React from 'react';
import { usePostsContext } from '../contexts';

const ProgressBar = () => {
   const { uploadPercentage } = usePostsContext();

   return (
      <div className='meter animate'>
         {uploadPercentage && uploadPercentage > 0 && (
            <span
               style={{
                  width: uploadPercentage ? `${uploadPercentage}%` : '0%',
               }}
            >
               <span
                  style={{
                     width: uploadPercentage ? `${uploadPercentage}%` : '0%',
                  }}
               ></span>
            </span>
         )}
      </div>
   );
};

export default ProgressBar;
