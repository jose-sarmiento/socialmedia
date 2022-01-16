import React from 'react';
import {
   FaThumbsUp,
   FaHeart,
   FaLaugh,
   FaAngry,
   FaSurprise,
} from 'react-icons/fa';

const ReactionPreview = ({ type }) => {
   if (type === 'love') {
      return (
         <div className='post__react  post__react--heart'>
            <FaHeart className='post__react-icon' />
         </div>
      );
   }

   if (type === 'laugh') {
      return (
         <div className='post__react post__react--laugh'>
            <FaLaugh className='post__react-icon' />
         </div>
      );
   }

   if (type === 'angry') {
      return (
         <div className='post__react  post__react--angry'>
            <FaAngry className='post__react-icon' />
         </div>
      );
   }

   if (type === 'wow') {
      return (
         <div className='post__react  post__react--wow'>
            <FaSurprise className='post__react-icon' />
         </div>
      );
   }

   return (
      <div className='post__react'>
         <FaThumbsUp className='post__react-icon' />
      </div>
   );
};

export default ReactionPreview;
