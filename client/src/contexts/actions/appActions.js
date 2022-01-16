import * as app from '../constants/appConstants'

export const showToast = ({message, type = 'info'}) =>dispatch => {
    dispatch({ type: app.toastDisplayed, payload: { message, type } });
  };

export const closeToast = () => dispatch => dispatch({ type: app.toastClosed });

export const changeActiveLink = (id) => dispatch => dispatch({ type: app.activeLinkChanged, payload: id });
