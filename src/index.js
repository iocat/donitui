/* import and inject to make material-ui+react happy */
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
/* DO NOT REMOVE THE ABOVE LINES */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxStoreProvider } from 'react-redux';

// Material UI Themes
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import mainTheme from './mainTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { appStore } from './stores/appStore';
import { App } from './components/app/App';

import "./static/css/index.css";
//import "react-grid-layout/css/styles.css"; // this is too laggyyyyyy!
//import "react-resizable/css/styles.css";	// this too.
ReactDOM.render(
	<MuiThemeProvider muiTheme={getMuiTheme(mainTheme)}>
		<ReduxStoreProvider store={appStore}>
			<App />
		</ReduxStoreProvider>
	</MuiThemeProvider>,
	document.getElementById('root')
);

import setupExamples from './setupExamples';  // Start some examples for debugging
setupExamples();