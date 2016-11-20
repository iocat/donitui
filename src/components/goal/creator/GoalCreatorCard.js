// @flow

import {GoalChanger, Mode} from './GoalChanger';
import {connect} from 'react-redux';
import {ActionCreators} from '../../../actions';
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
            let g = Object.assign({}, goal, {id: 10});
            dispatch(ActionCreators.LOAD_GOAL(g, new Date()));
        },
    };
}

let GoalCreatorCard = connect(mapStateToProps, mapDispatchToProps)(GoalChanger);
export default GoalCreatorCard;
