import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const setupStore = () => {
  return configureStore({
    reducer,
  });
};

export default setupStore;
