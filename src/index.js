/* import and inject to make material ui happy */
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
/* DO NOT REMOVE THE ABOVE LINES */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Material UI Themes
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { appStore } from './stores/appStore';
import { App } from './components/app/App';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

ReactDOM.render(
	<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
		<Provider store={appStore}>
			<App />
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root')
);

import setupExamples from './setupExamples';
setupExamples();