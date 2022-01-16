import React, { useEffect } from 'react';
import { closeToast } from '../contexts/actions/appActions';
import { useAppContext } from '../contexts/appContext';

const Toast = () => {
   const { toastMessage, toastType, dispatch } = useAppContext();

   useEffect(() => {
      const timeout = setTimeout(() => {
         closeToast()(dispatch);
      }, 3000);

      return () => {
         clearTimeout(timeout);
      };
   }, []);

   return (
      <div className={`toast toast--${toastType}`}>
         <div className='toast__message'>{toastMessage}</div>
      </div>
   );
};

export default Toast;
