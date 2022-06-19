import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { SocketProvider } from './contexts/socketContext';

import './assets/sass/main.scss';
import './index.css';

import configureStore from './store/configureStore';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SocketProvider>
      <Router>
        <App />
      </Router>
    </SocketProvider>
  </Provider>
);
