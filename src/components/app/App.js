import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import DocumentTitle from 'react-document-title';

import PersonalTrackingView from './PersonalTrackingView';
import EditGoalView from './EditGoalView';
import GoalView from './GoalView';
import ResourceNotFound from './ResourceNotFound';
import HomePage from './HomePage';
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
                            <Route path="/tests" component={Testing}/>
                            <Route path="/404" component={ResourceNotFound}/>
                            <Route path="/" component={HomePage}/>
                            <Route path="/:userId" component={PersonalTrackingView}/>
                            <Route path="/:userId/goals" component={PersonalTrackingView}/>
                            <Route path="/:userId/goals/:goalId/edit" component={EditGoalView}/>
                        </Router>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}
