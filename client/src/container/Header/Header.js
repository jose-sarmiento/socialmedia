import React from 'react';
import {
   FaFacebookSquare,
   FaSearch,
} from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { CircleImage } from '../../components';
import { logout } from '../../store/auth';

import "./Header.scss";

const Header = () => {
   const dispatch = useDispatch();

   const auth = useSelector(state => state.auth)

   const handleUserLogout = () => dispatch(logout());

   return (
      <header className='header'>
         {/* for logo */}
         <div className="header__links">
            <span className='header__link'>About</span>
            <span className='header__link'>Help</span>
         </div>

         <div className="search-container">
            <form className='search'>
               <FaSearch className='search__icon' />
               <input
                  type='search'
                  name='search'
                  id='search'
                  className='search__input'
                  placeholder='Search something...'
               />
            </form>
         </div>

         <div className='header__user'>
            <span className='header__fname'>Hi, {auth.user?.firstname}</span>
            <div className="header__img">
               <img
                  src={auth.user?.profileImage}
                  alt={auth.user?.firstname}
               />
            </div>
         </div>

      </header>
   );
};

export default Header;
