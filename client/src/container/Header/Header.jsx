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
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.entities.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if(searchTerm === "") {
      setIsSearching(false);
      setSearchResults([]);
      setError(undefined);
    }
  }, [searchTerm])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(searchTerm.trim() === "" ) return;
     try {
        setLoading(true);
        setIsSearching(true);
        const { data } = await axios({
          url: '/api/v1/users/search',
          headers: { Authorization: `Bearer ${auth.token}` },
          params: { q: searchTerm },
        });
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        setError("Something wen't wrong")
        setLoading(false);
      }
  }

  return (
    <header className="header">
      {/* for logo */}

      <div className="search-container">
        <form className="search" onSubmit={handleSubmit}>
          <FaSearch className="search__icon" />
          <input
            type="search"
            name="search"
            id="search"
            className="search__input"
            placeholder="Search something..."
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className={isSearching ? "search-container__suggestions search-container__suggestions--show" : "search-container__suggestions"}>
          {loading ? (
            <>
              {[...Array(3).keys()].map(() => (
                <div className="user user--skeleton">
                  <figure className="skeleton" />
                  <span className="skeleton" />
                  <span className="skeleton ml-1" />
                </div>
              ))}
            </>
          ) : (
            <>
              {searchResults.length === 0 ? (
                <div className="no-results">No results found</div>
              ) : (
                <>
                  {searchResults.map((x) => (
                    <Link to={`/users/${x._id}`} className="user">
                      <figure>
                        <img src={x.profileImage} alt={x.name} />
                      </figure>
                      <span>{x.name}</span>
                    </Link>
                  ))}
                </>
              )}
            </>
          )}
        </div>
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
