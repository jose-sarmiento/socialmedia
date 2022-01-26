import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/sass/main.scss';
import { App } from './components';

import { AppProvider } from './contexts/appContext';
import { AuthProvider } from './contexts/authContext';
import { UsersProvider } from './contexts/usersContext';
import { PostsProvider } from './contexts/postsContext';
import { MessengerProvider } from './contexts/messengerContext';

ReactDOM.render(
	<AppProvider>
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
	</AppProvider>,
	document.getElementById('root')
);
