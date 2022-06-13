import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaChevronRight, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/auth';

import spinner from '../../assets/img/spinner2.gif';
// import './Login.scss';

function Login() {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [error, setError] = useState();

  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (!auth.user) return;

    setFields({
      email: '',
      password: '',
    });
    setError(null);
    navigate(from, { replace: true });
  }, [navigate, auth.user, from]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.email === '' || fields.password === '') {
      return setError('All fields are required');
    }

    return dispatch(login(fields));
  };

  function handleInputChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    setFields({ ...fields, [name]: value });
  }

  return (
    <div className="signin">
      <h2 className="signin__title mb-4">This is not You?</h2>
      <form className="w-100 form" onSubmit={handleSubmit}>
        {error && <p className="form__error">{error}</p>}
        {auth.errors?.login && (
          <p className="form__error">Invalid email or password</p>
        )}
        <div className="form__group">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your e-Mail Address"
            className="form__input"
            value={fields.email}
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="email" className="form__label">
            Your e-Mail Address
          </label>
        </div>

        <div className="form__group">
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Your Password"
            className="form__input"
            value={fields.password}
            onChange={handleInputChange}
            autoComplete="false"
            required
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="password" className="form__label">
            Your Password
          </label>
        </div>

        <div className="form__group flex-center">
          <button
            type="submit"
            className="button button--primary"
            disabled={auth.loadings?.login}
          >
            {auth.loadings?.login ? (
              <img src={spinner} alt="spinner" />
            ) : (
              'Login'
            )}
            <figure className="button__icon-wrapper button__icon-wrapper--blue">
              <FaChevronRight />
            </figure>
          </button>
        </div>
      </form>

      <hr className="divider" />

      <Link to="/register" className="button button--outline-reverse">
        Sign-up
        <figure className="button__icon-wrapper button__icon-wrapper--blue">
          <FaPlus />
        </figure>
      </Link>
    </div>
  );
}

export default Login;
