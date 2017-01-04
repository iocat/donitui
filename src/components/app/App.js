import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import DocumentTitle from 'react-document-title';

import PersonalTracking from './PersonalTracking';
import EditGoal from './EditGoal';
import NavigationBar from '../nav/NavigationBar';

import Testing from '../test/Testing'

export default class App extends React.Component {
    render() {
        return (
            <DocumentTitle title="Donit: Personal Goal Tracker">
                <div>
                    <div className="nav-bar" >
                        <NavigationBar/>
                        </div>
                    <div className="main-app">
                        <Router history={browserHistory}>
                            <Route path="/" component={PersonalTracking}/>
                            <Route path="/tests" component={Testing}/>
                            <Route path="/:userId" component={PersonalTracking}/>
                            <Route path="/:userId/goals" component={PersonalTracking}/>
                            <Route path="/:userId/goals/:goalId/edit" component={EditGoal}/>

                        </Router>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}
