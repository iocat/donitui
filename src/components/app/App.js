import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import DocumentTitle from 'react-document-title';

import PersonalTracking from './PersonalTracking';
import EditGoal from './EditGoal';


export default class App extends React.Component {
    render() {
        return (
            <DocumentTitle title="Donit: Personal Goal Tracker">
                <div className="app">
                    <Router history={browserHistory}>
                        <Route path="/:userId" component={PersonalTracking}/>
                        <Route path="/:userId/goals" component={PersonalTracking}/>
                        <Route path="/:userId/goals/:goalId/edit" component={EditGoal}/>
                    </Router>
                </div>
            </DocumentTitle>
        )
    }
}
