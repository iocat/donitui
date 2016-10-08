import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {appStore} from './stores/appStore';
import {Provider} from 'react-redux';
import {AppWithStore} from './components/containers/AppWithStore';

/* import and inject to make material ui happy */
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
/* imported :)) */

ReactDOM.render(
    <Provider store={appStore}>
		<AppWithStore />
	</Provider>,
	document.getElementById('root')
);

/* some test code! */
import {
	createGoalWithID,
} from './actions/goals';

import {
	router
} from './routing/router';

let goal1 = {
	id: "ab4c91eeb",
    name: "Have a dog",
    description: "Better be a Corgi",
    img: "http://cdn.images.express.co.uk/img/dynamic/106/590x/secondary/Corgi-on-the-beach-251307.jpg",
	tasks:{
		1: {
			id:1,
			name:"Adopt one",
			reminder:{
			
			},
			status:"DONE",
		},
		3:{
			id:3,
			name:"sdfasdfasdf",
			repeatedReminder:{

			},
			description:"ADSSAD",
			status:"NOT_DONE",
		}
	}
}

let goal2 = {
	id: "ab482cd",
    name: "Software Engineer!!",
    description: "My career",
	tasks:{
		1:{
			id: 1,
			name:"Completely accept",
			status: "NOT_DONE",
			reminder:{

			},
		},
		3:{
			id: 3,
			name:"Read a lot",
			status:"DONE",
			repeatedReminder:{

			},
		},
		2:{
			id: 2,
			name:"On the internet, nobody knows you are a dog",
			status:"IN_PROGRESS",
			repeatedReminder:{

			},
		}
	}
}

let goal3 = {
	id: "abbbc12",
    name: "Adopt a cat!!",
    img: "https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg",
    description: "LOLCAT",
	tasks:{},
}

/* ignore return val*/ appStore.subscribe(()=>{console.log(appStore.getState())})
appStore.dispatch(createGoalWithID(1, goal1));
appStore.dispatch(createGoalWithID(2, goal2));
appStore.dispatch(createGoalWithID(3, goal3));
console.log(router.user("iocat").goals("asd").url())
console.log(router.user("thanhngo").goals(null).url())