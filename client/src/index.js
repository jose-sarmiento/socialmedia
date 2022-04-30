import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/sass/main.scss';
import { App } from './components';
import { Provider } from "react-redux";

import { AppProvider } from './contexts/appContext';
import { SocketProvider } from './contexts/socketContext';
import { AuthProvider } from './contexts/authContext';
import { UsersProvider } from './contexts/usersContext';
import { PostsProvider } from './contexts/postsContext';
import { MessengerProvider } from './contexts/messengerContext';

import configureStore from "./store/configureStore"

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<AppProvider>
			<SocketProvider>
				<AuthProvider>
					<UsersProvider>
						<PostsProvider>
							<MessengerProvider>
								<Router>
									<App />
								</Router>
							</MessengerProvider>
						</PostsProvider>
					</UsersProvider>
				</AuthProvider>
			</SocketProvider>
		</AppProvider>
	</Provider>,
	document.getElementById('root')
);
