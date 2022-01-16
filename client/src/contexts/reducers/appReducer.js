import * as app from '../constants/appConstants';

const appReducer = (state, action) => {
  switch (action.type) {
    case app.toastDisplayed:
      return {
        ...state,
        toastIsShowing: true,
        toastMessage: action.payload.message,
        toastType: action.payload.type,
      };

    case app.toastClosed:
      return { ...state, toastIsShowing: false, toastMessage: null };

    case app.activeLinkChanged:
      return { ...state, activeLink: action.payload };

    default:
      throw new Error('Invalid action type');
  }
};

export default appReducer;
