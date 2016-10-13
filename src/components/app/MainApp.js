import React from 'react';
import {GoalTrackingWithStore} from '../goal/GoalTrackingWithStore';

export default class MainApp extends React.Component {
    render(){
        return <GoalTrackingWithStore/>  
    }
}

MainApp.defaultProps = {
    filterStatus: ["DONE", "NOT_DONE", "IN_PROGRESS"],
}