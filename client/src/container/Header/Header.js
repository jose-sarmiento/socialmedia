import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from "react-redux";

import "./Header.scss";

const Header = () => {
   const user = useSelector(state => state.entities.users.user)

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
            <span className='header__fname'>Hi, {user?.firstname}</span>
            <div className="header__img">
               <img
                  src={user?.profileImage}
                  alt={user?.firstname}
               />
            </div>
         </div>

      </header>
   );
};

export default Header;
