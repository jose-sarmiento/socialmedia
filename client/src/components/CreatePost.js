import React, { useState, useEffect } from 'react';
import {
   FaCamera,
   FaPaperPlane,
   FaTimes,
   FaVideo,
   FaHeading,
} from 'react-icons/fa';
import ProgressBar from './ProgressBar';
import { createPost } from '../contexts/actions/postActions';

import { useAuthContext, usePostsContext, useUsersContext } from '../contexts';

const CreatePost = ({ variant = 'reg' }) => {
   const [body, setBody] = useState('');
   const [title, setTitle] = useState('');
   const [files, setFiles] = useState([]);
   const [isTitleOpen, setIsTitleOpen] = useState(false);

   const { auth } = useAuthContext();
   const { user } = useUsersContext();
   const {
      loadingCreate,
      errorCreate,
      successCreate,
      dispatch: postsDispatch,
   } = usePostsContext();

   useEffect(() => {
      if (!successCreate) return;
      clearFields();
      setIsTitleOpen(false);
   }, [successCreate]);

   function handleFileSelect(e) {
      setFiles([...files, ...e.target.files]);
   }

   function handleFormSubmit(e) {
      e.preventDefault();
      if (loadingCreate) return;
      if (!body && files.length === 0) return;

      const formData = new FormData();
      if (title) formData.append('title', title);
      if (body) formData.append('body', body);

      files.forEach(file => {
         formData.append('files', file);
      });

      createPost({ formData, token: auth.token })(postsDispatch);
   }

   function handlePreviewDelete(name) {
      setFiles(files.filter(file => file.name !== name));
   }

   function clearFields() {
      setTitle('');
      setBody('');
      setFiles([]);
   }

   function toggleIsTitleOpen() {
      setIsTitleOpen(prev => !prev);
   }

   if (!user) return null

   return (
      <>
         <div
            className={
               variant === 'small'
                  ? 'introduction introduction--small mx-auto mb-4'
                  : 'introduction mx-auto mb-4'
            }
         >
            {variant !== 'small' && (
               <figure className="introduction__user">
                  <img
                     src={user.profileImage}
                     alt={user.firstname}
                  />
               </figure>
            )}
            <form
               className='introduction__form'
               onSubmit={handleFormSubmit}
               encType='multipart/form-data'
            >
               {errorCreate && <div className='form__error'>{errorCreate}</div>}
               {isTitleOpen && (
                  <input
                     placeholder='Add Title ( Optional )'
                     className='introduction__input'
                     value={title}
                     onChange={e => setTitle(e.target.value)}
                  />
               )}
               <textarea
                  className='introduction__input'
                  placeholder={`What's in your mind ${user.firstname}?`}
                  value={body}
                  onChange={e => setBody(e.target.value)}
               ></textarea>
               <div className='introduction__btns'>
                  <button
                     className={
                        variant === 'small'
                           ? 'btn btn--circle btn--circle--small btn--secondary btn--label'
                           : 'btn btn--circle btn--secondary btn--label'
                     }
                     onClick={toggleIsTitleOpen}
                  >
                     <FaHeading title='add heading' />
                  </button>
                  <label
                     htmlFor='images'
                     className={
                        variant === 'small'
                           ? 'btn btn--circle btn--circle--small btn--secondary btn--label'
                           : 'btn btn--circle btn--secondary btn--label'
                     }
                  >
                     <FaCamera />
                  </label>
                  <input
                     type='file'
                     accept='image/png,image/jpeg'
                     multiple='multiple'
                     id='images'
                     onChange={handleFileSelect}
                     className='hide'
                  />
                  <label
                     htmlFor='videos'
                     className={
                        variant === 'small'
                           ? 'btn btn--circle btn--circle--small btn--secondary btn--label'
                           : 'btn btn--circle btn--secondary btn--label'
                     }
                  >
                     <FaVideo />
                  </label>
                  <input
                     type='file'
                     accept='video/mp4,video/x-m4v,video/*'
                     multiple='multiple'
                     id='videos'
                     onChange={handleFileSelect}
                     className='hide'
                  />
                  <button
                     type='submit'
                     className='btn btn--circle btn--primary ml-1 form__submit-btn'
                     className={
                        variant === 'small'
                           ? 'btn btn--circle btn--circle--small btn--primary ml-1 form__submit-btn'
                           : 'btn btn--circle btn--primary ml-1 form__submit-btn'
                     }
                     disabled={loadingCreate}
                  >
                     <FaPaperPlane className='btn__icon--paper-plane' />
                  </button>
               </div>
            </form>

            <ProgressBar />
         </div>

         {files && files.length > 0 && (
            <div className='previews mb-4'>
               <h5 className='previews_heading'>Attached Files</h5>
               <div className='previews__previews'>
                  {files.map((file, index) => (
                     <div className='preview' key={index}>
                        <h4 className='preview__name'>{file.name}</h4>
                        <FaTimes
                           className='preview__icon'
                           onClick={() => handlePreviewDelete(file.name)}
                        />
                     </div>
                  ))}
               </div>
            </div>
         )}
      </>
   );
};

export default CreatePost;
