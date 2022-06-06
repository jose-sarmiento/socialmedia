import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";

import { SocketProvider } from "./contexts/socketContext";

import "./assets/sass/main.scss";
import "./index.css";

import configureStore from "./store/configureStore";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<SocketProvider>
			<Router>
				<App />
			</Router>
		</SocketProvider>
	</Provider>,
	document.getElementById("root")
);
