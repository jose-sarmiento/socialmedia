import React, { useContext, useReducer } from "react";
import reducer from "./reducers/appReducer";
import { displayToast, hideToast } from './actions/appActions'

const AppContext = React.createContext();

const initialState = {
	toastIsShowing: false,
  activeLink: 1,
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{...state, dispatch}} >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
