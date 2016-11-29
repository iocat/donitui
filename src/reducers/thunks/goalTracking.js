// @flow
import type {Goal} from '../../data/types';

import {ActionCreators} from '../../actions';

type DispatchFunc = (dispatch: any) => void;

export function createGoal(goal: Goal): DispatchFunc {
    return dispatch => {
        console.log("Create goal: ");
        // TODO: contact the server or whatever
        let g = Object.assign({}, goal, {
            id: Math.floor(Math.random() * 100000)
        });
        dispatch(ActionCreators.CREATE_GOAL(g));
    }
}

export function replaceGoal(goalId: Goal, goal: Goal): DispatchFunc {
    return dispatch => {
        // TODO: contact the server or whatever
        dispatch(ActionCreators.DELETE_GOAL(goalId));
        dispatch(ActionCreators.CREATE_GOAL(goal));
    }
}
