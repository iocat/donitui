// TODO instead of app with store do GoalsWithStore: get rid of these
import {connect} from 'react-redux';

import React from 'react';
import PersonalTracking from './PersonalTracking';

class _App extends React.Component {
    render(){
        return <PersonalTracking/> 
    }
}

export const App = connect()(_App);