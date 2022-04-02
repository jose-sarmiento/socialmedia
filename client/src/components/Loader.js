import React from "react";

const Loader = () => {
  return (
    <div className="post post-skeleton">
       <div className='post__header mb-_5'>
          <figure className="post__user-img skeleton"></figure>
          <span className='post__heading skeleton'></span>
          <span className='post__time skeleton'></span>
       </div>

       <div className="post__media skeleton"></div>

        <div className='post__body'>
           <div className='post__description'>
              <p className='post__title skeleton'></p>
               <p className='post__caption skeleton'></p>
               <p className='post__caption skeleton'></p>
               <p className='post__caption skeleton'></p>
               <p className='post__caption skeleton'></p>
           </div>

            <div className='post__stats'>
              <div className="post__reacts">
                <div className='post__react skeleton'></div>
                <div className='post__react skeleton'></div>
                <div className='post__react skeleton'></div>
              </div>
              <span className='post__people-react skeleton'></span>
              <span className='post__comment-counts skeleton'></span>
            </div>
        </div>

            <div className='post__footer'>
               <div className='post__comment-form skeleton'></div>

               <button className='post__action post__action--share skeleton'></button>
               <button className='post__action skeleton'></button>
            </div>
         </div>
  );
};

export default Loader;
