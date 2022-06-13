import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  clearSearchResults,
  searchUsersRequested,
  searchUsersSuccess,
  searchUsersFailed,
} from '../../store/users';

import './Header.scss';

function Header() {
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.entities.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm.trim() === '') {
        dispatch(clearSearchResults())
        return;
    };
    const source = axios.CancelToken.source();

    async function searchUsers() {
      try {
        dispatch(searchUsersRequested());
        const { data } = await axios({
          url: '/users/search',
          headers: { Authorization: `Bearer ${auth.token}` },
          params: { q: searchTerm },
          cancelToken: source.token,
        });
        dispatch(searchUsersSuccess(data));
      } catch (error) {
        dispatch(searchUsersFailed("Something wen't wrong"));
      }
    }

    searchUsers();
    // return () => source.cancel();
  }, [searchTerm, auth.token, dispatch]);

  return (
    <header className="header">
      {/* for logo */}
      {/* <div className="header__links">
                <span className="header__link">About</span>
                <span className="header__link">Help</span>
            </div> */}

      <div className="search-container">
        <form className="search">
          <FaSearch className="search__icon" />
          <input
            type="search"
            name="search"
            id="search"
            className="search__input"
            placeholder="Search something..."
            autoComplete="false"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </form>

        {isFocus && users.success.search && (
          <>
            {' '}
            {/* eslint-disable-next-line no-nested-ternary */}
            {users.loading.search ? (
              <div className="search-container__suggestions">
                {[...Array(3).keys()].map(() => (
                  <div className="user user--skeleton">
                    <figure className="skeleton" />
                    <span className="skeleton" />
                    <span className="skeleton ml-1" />
                  </div>
                ))}
              </div>
            ) : users.searchResults.length === 0 ? (
              <div className="search-container__suggestions">
                <div className="no-results">No results found</div>
              </div>
            ) : (
              <div className="search-container__suggestions">
                {users.searchResults.map((x) => (
                  <div className="user">
                    <figure>
                      <img src={x.profileImage} alt={x.name} />
                    </figure>
                    <span>{x.name}</span>
                  </div>
                ))}
              </div>
            )}{' '}
          </>
        )}
      </div>

      <div className="header__user">
        <Link to="/users/me">
          <span className="header__fname">Hi, {users.user?.firstname}</span>
        </Link>
        <Link to="/users/me" className="header__img">
          <img src={users.user?.profileImage} alt={users.user?.firstname} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
