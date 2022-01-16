import React, { useState } from 'react';
import {
   FaAngry,
   FaHeart,
   FaLaugh,
   FaSurprise,
   FaThumbsUp,
} from 'react-icons/fa';

const PopupReactions = ({ isShowing, select }) => {
   return (
      <div
         className={
            isShowing
               ? 'post__reaction-choices post__reaction-choices--show'
               : 'post__reaction-choices'
         }
      >
         <FaThumbsUp
            className='post__reaction-choice post__reaction-choice--like'
            alt='like'
            onClick={() => select('like')}
         />
         <FaHeart
            className='post__reaction-choice post__reaction-choice--heart'
            alt='love'
            onClick={() => select('love')}
         />
         <FaLaugh
            className='post__reaction-choice post__reaction-choice--laugh'
            alt='laugh'
            onClick={() => select('laugh')}
         />
         <FaSurprise
            className='post__reaction-choice post__reaction-choice--wow'
            alt='wow'
            onClick={() => select('wow')}
         />
         <FaAngry
            className='post__reaction-choice post__reaction-choice--angry'
            alt='angry'
            onClick={() => select('angry')}
         />
      </div>
   );
};

export default PopupReactions;
