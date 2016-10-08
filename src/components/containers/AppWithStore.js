/* @flow */

// TODO instead of app with store do GoalsWithStore: get rid of these
import {connect} from 'react-redux';
import MainApp from '../app/MainApp';

function filterGoals(rootState = {}){
    let goals = rootState.userGoal.goals;
    return Object.keys(goals).map(
        (key) => {
            let g = Object.assign({}, goals[key]);
            g.tasks = Object.keys(g.tasks).map( (key) => g.tasks[key]); // denormalize task
            return g;
        }
    ); // denormalize goal
}

export function mapStateToProps(rootStore){
    return {
        goals: filterGoals(rootStore),
        canUpdate: true,
    }
}

export const AppWithStore = connect(mapStateToProps)(MainApp);