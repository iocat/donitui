import {
    connect
} from 'react-redux';

import {
    GoalChanger,
    Mode
} from './GoalChanger';
import {
    ActionCreators
} from '../../../actions';
import type {
    Goal
} from '../../../data/types';

const mapStateToProps = (rootReducer) => {
    return {
        mode: Mode.CREATE,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateGoal: (goal: Goal) => {
            // TODO: change this to a callback to the network
            // a promise.
            let g = Object.assign({}, goal, {
                id: 10
            });
            dispatch(ActionCreators.CREATE_GOAL(g, new Date()));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalChanger);
