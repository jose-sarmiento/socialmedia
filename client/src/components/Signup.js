import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaChevronRight, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux"

import {register} from '../store/auth'

const Signup = () => {
   const [fields, setFields] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      sex: 'male',
      birthdate: '',
   });
   const [error, setError] = useState(null);

   const auth = useSelector(state => state.auth);

   const dispatch = useDispatch();
   const history = useHistory();

   useEffect(() => {
      if (!auth.user) return;

      setFields({
         firstname: '',
         lastname: '',
         email: '',
         password: '',
         sex: 'male',
         birthdate: '',
      });
      setFields(null);
      history.push('/');
   }, [history, auth.user]);

   function handleInputChange(e) {
      const name = e.target.name;
      const value = e.target.value;
      setFields({ ...fields, [name]: value });
   }

   function handleSubmit(e) {
      e.preventDefault();
      if (
         fields.firstname === '' ||
         fields.lastname === '' ||
         fields.email === '' ||
         fields.password === '' ||
         fields.sex === '' ||
         fields.birthdate === ''
      ) {
         return setError('All Fields are required');
      }
      dispatch(register(fields));
   }

   return (
      <div className='signup'>
         <h2 className='signin__title mb-4'>Join Our Community</h2>
         <form className='form' onSubmit={handleSubmit}>
            {error && <p className='form__error'>{error}</p>}
            {auth.errors.register && <p className='form__error'>Something went wrong. Try again</p>}
            <div className='grid-2'>
               <div className='form__group'>
                  <input
                     type='text'
                     id='firstname'
                     name='firstname'
                     placeholder='Firstname'
                     className='form__input'
                     value={fields.firstname}
                     onChange={handleInputChange}
                     autoComplete='off'
                     required
                  />
                  <label htmlFor='firstname' className='form__label'>
                     Firstname
                  </label>
               </div>

               <div className='form__group'>
                  <input
                     type='text'
                     id='lastname'
                     name='lastname'
                     placeholder='Lastname'
                     className='form__input'
                     value={fields.lastname}
                     onChange={handleInputChange}
                     autoComplete='off'
                     required
                  />
                  <label htmlFor='lastname' className='form__label'>
                     Lastname
                  </label>
               </div>
            </div>
            <div className='form__group'>
               <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Phone Number or Email'
                  className='form__input'
                  value={fields.email}
                  onChange={handleInputChange}
                  autoComplete='off'
                  required
               />
               <label htmlFor='email' className='form__label'>
                  Phone Number or Email
               </label>
            </div>

            <div className='form__group'>
               <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='New Password'
                  className='form__input'
                  value={fields.password}
                  onChange={handleInputChange}
                  required
               />
               <label htmlFor='password' className='form__label'>
                  New Password
               </label>
            </div>

            <div className='grid-2 mb-1'>
               <h3 className='form__grid-label'>Sex</h3>
               <h3 className='form__grid-label'>Birthdate</h3>
            </div>

            <div className='grid-2 mb-3'>
               <div className='form__group form__group--radio'>
                  <div className='form__radio-group'>
                     <input
                        type='radio'
                        name='sex'
                        id='male'
                        value='male'
                        className='form__radio-input'
                        checked={fields.sex === 'male'}
                        onChange={handleInputChange}
                        required
                     />
                     <label htmlFor='male' className='form__radio-label'>
                        <span className='form__radio-button'></span>
                        Male
                     </label>
                  </div>

                  <div className='form__radio-group'>
                     <input
                        type='radio'
                        name='sex'
                        id='female'
                        className='form__radio-input'
                        checked={fields.sex === 'female'}
                        value='female'
                        onChange={handleInputChange}
                        required
                     />
                     <label htmlFor='female' className='form__radio-label'>
                        <span className='form__radio-button'></span>
                        Female
                     </label>
                  </div>
               </div>

               <div className='form__group'>
                  <input
                     type='date'
                     name='birthdate'
                     id='birthdate'
                     className='form__date-input'
                     value={fields.birthdate}
                     onChange={handleInputChange}
                     required
                  />
               </div>
            </div>

            <div className='form__group flex-center'>
               <button
                  type='submit'
                  className='button button--primary'
                  disabled={auth.loadings.register}
               >
                  {auth.loadings.register ? 'spinner' : 'Sign-up'}
                  <figure className='button__icon-wrapper button__icon-wrapper--blue'>
                     <FaPlus />
                  </figure>
               </button>
            </div>
         </form>

         <hr className='divider' />

         <Link to='/login' className='button button--outline-reverse'>
            Already have an Account?
            <figure className='button__icon-wrapper button__icon-wrapper--blue'>
               <FaChevronRight />
            </figure>
         </Link>
      </div>
   );
};

export default Signup;
