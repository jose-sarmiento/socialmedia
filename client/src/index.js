import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/sass/main.scss';
import { App } from './components';

import { AppProvider } from './contexts/appContext';
import { AuthProvider } from './contexts/authContext';
import { UsersProvider } from './contexts/usersContext';
import { PostsProvider } from './contexts/postsContext';

ReactDOM.render(
	<AppProvider>
		<AuthProvider>
			<UsersProvider>
				<PostsProvider>
					<Router>
						<App />
					</Router>
				</PostsProvider>
			</UsersProvider>
		</AuthProvider>
	</AppProvider>,
	document.getElementById('root')
);
