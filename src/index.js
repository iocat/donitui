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

/* some test code! */
import {
	ActionCreators
} from './actions/index';
import {
	router
} from './routing/router';
let goal1 = {
	id: "ab4c91eeb",
	name: "Have a dog",
	description: "Better be a Corgi",
	visibility: "PUBLIC",
	img: "http://cdn.images.express.co.uk/img/dynamic/106/590x/secondary/Corgi-on-the-beach-251307.jpg",
	tasks: {
		1: {
			id: 1,
			name: "Adopt one",
			reminder: {

			},
			status: "DONE",
		},
		3: {
			id: 3,
			name: "sdfasdfasdf",
			repeatedReminder: {

			},
			description: "ADSSAD",
			status: "DONE",
		}
	}
}

let goal2 = {
	id: "ab482cd",
	name: "Software Engineer!!",
	visibility: "PRIVATE",
	img: "https://udemy-images.udemy.com/course/750x422/231400_a221_4.jpg",
	description: "My career",
	tasks: {
		1: {
			id: 1,
			name: "Completely accept",
			status: "DONE",
			reminder: {

			},
		},
		3: {
			id: 3,
			name: "Read a lot",
			status: "DONE",
			repeatedReminder: {

			},
		},
		2: {
			id: 2,
			name: "On the internet, nobody knows you are a dog",
			status: "DONE",
			repeatedReminder: {

			},
		}
	}
}

let goal3 = {
	id: "abbbc12",
	name: "Adopt a cat!!",
	visibility: "FOR_FOLLOWERS",
	img: "https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg",
	description: "LOLCAT",
	tasks: {},
}

let goal4 = Object.assign({}, goal1, { id: 4, name: "Kill a dog", description: "Illegal stuffs", img: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi" });
/* ignore return val*/ appStore.subscribe(() => { console.log(appStore.getState()) })
appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(1, goal1));
appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(2, goal2));
setTimeout(() => appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(3, goal3)), 2000);
setTimeout(() => appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(4, goal4)), 5000);

console.log(router.users("thanhngo").goals(null).url())