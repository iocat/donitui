// @flow

import {GoalChanger, Mode} from './GoalChanger';
import {connect} from 'react-redux';
import {ActionCreators} from '../../../actions/index';
import type {Goal} from '../../../data/types';

function mapStateToProps(rootReducer){
    return {
        mode: Mode.CREATE,
    }
}

function mapDispatchToProps(dispatch){
    return {
        onCreateGoal: (goal:Goal)=> {
            // TODO: change this to a callback to the network
            // a promise.
            dispatch(ActionCreators.CREATE_GOAL_WITH_ID(10,goal));
        },
    };
}

let GoalCreatorCard = connect(mapStateToProps, mapDispatchToProps)(GoalChanger);
export default GoalCreatorCard;
