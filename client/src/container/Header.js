import React from 'react';
import {
   FaFacebookSquare,
   FaSearch,
} from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { CircleImage } from '../components';
import { logout } from '../store/auth';

const Header = () => {
   const dispatch = useDispatch();

   const auth = useSelector(state => state.auth)

   const handleUserLogout = () => dispatch(logout());

   return (
      <header className='header'>
         <div className='navbar'>
            <div className='navbar__left'>
               <a href='/' className='navbar__brand'>
                  <FaFacebookSquare className='navbar__fb-logo' />
               </a>

               <form className='navbar__search ml-2'>
                  <input
                     type='search'
                     name='search'
                     id='search'
                     className='navbar__search-input'
                     placeholder='Search facebook'
                  />
                  <FaSearch className='navbar__search-icon' />
               </form>
            </div>

            <div className='navbar__right'>
               <div className='navbar__user'>
                  <CircleImage>
                     <img
                        src={auth.user?.profileImage}
                        alt={auth.user?.firstname}
                     />
                  </CircleImage>
                  <span className='navbar__fname'>{auth.user?.firstname}</span>
               </div>

               <button
                  className='navbar__signout'
                  onClick={handleUserLogout}
               >
                  Sign-out
               </button>
            </div>
         </div>
      </header>
   );
};

export default Header;
