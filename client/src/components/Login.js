import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FaChevronRight, FaPlus } from 'react-icons/fa';
import spinner from '../assets/img/spinner2.gif';
import {login} from '../contexts/actions/authActions'

import { useAuthContext } from '../contexts';

const Login = () => {
   const [fields, setFields] = useState({ email: '', password: '' });
   const [error, setError] = useState();

   const history = useHistory();
   const location = useLocation();

   const { from } = location.state || { from: { pathname: "/" } };

   const { auth, loginLoading, loginError, dispatch } = useAuthContext();

   useEffect(() => {
      if (!auth) return;

      setFields({
         email: '',
         password: '',
      });
      setError(null);
      history.replace(from)
   }, [history, auth]);

   useEffect(() => {
      if (loginError) {
         setError(loginError);
      }
   }, [loginError]);

   function handleSubmit(e) {
      e.preventDefault();
      if (fields.email === '' || fields.password === '')
         return setError('All fields are required');

      login(fields)(dispatch);
   }

   function handleInputChange(e) {
      const name = e.target.name;
      const value = e.target.value;
      setFields({ ...fields, [name]: value });
   }

   return (
      <div className='signin'>
         <h2 className='signin__title mb-4'>This is not You?</h2>
         <form className='w-100 form' onSubmit={handleSubmit}>
            {(error || loginError) && (
               <p className='form__error'>{error}</p>
            )}
            <div className='form__group'>
               <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Your e-Mail Address'
                  className='form__input'
                  value={fields.email}
                  onChange={handleInputChange}
                  autoComplete='off'
                  required
               />
               <label htmlFor='email' className='form__label'>
                  Your e-Mail Address
               </label>
            </div>

            <div className='form__group'>
               <input
                  name='password'
                  type='password'
                  id='password'
                  placeholder='Your Password'
                  className='form__input'
                  value={fields.password}
                  onChange={handleInputChange}
                  autoComplete='false'
                  required
               />
               <label htmlFor='password' className='form__label'>
                  Your Password
               </label>
            </div>

            <div className='form__group flex-center'>
               <button
                  type='submit'
                  className='button button--primary'
                  disabled={loginLoading}
               >
                  {loginLoading ? <img src={spinner} alt='spinner' /> : 'Login'}
                  <figure className='button__icon-wrapper button__icon-wrapper--blue'>
                     <FaChevronRight />
                  </figure>
               </button>
            </div>
         </form>

         <hr className='divider' />

         <Link to='/register' className='button button--outline-reverse'>
            Sign-up
            <figure className='button__icon-wrapper button__icon-wrapper--blue'>
               <FaPlus />
            </figure>
         </Link>
      </div>
   );
};

export default Login;
