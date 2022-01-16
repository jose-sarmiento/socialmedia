import React from 'react';
import {
   FaBell,
   FaFacebookSquare,
   FaCaretDown,
   FaSearch,
} from 'react-icons/fa';
import {logout} from '../contexts/actions/authActions'

import { useAuthContext, useUsersContext } from '../contexts';

const Header = () => {
   const { auth, dispatch } = useAuthContext();
   const { user } = useUsersContext();



   const handleUserLogout = () => logout()(dispatch);

   // if (!auth || !user) return null;
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
                  <img
                     src={user.profileImage}
                     className='navbar__img'
                     alt='test'
                  />
                  <span className='navbar__fname'>{user.firstname}</span>
               </div>

               <a href='/' className='navbar__link navbar__link--notification'>
                  <FaBell />
                  <span className='navbar__float-number'>12</span>
               </a>

               <button
                  className='navbar__link navbar__link--caret'
                  onClick={handleUserLogout}
               >
                  <FaCaretDown />
               </button>
            </div>
         </div>
      </header>
   );
};

export default Header;
