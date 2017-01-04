// @flow
import type {Goal} from '../../data/types';
import {ActionCreators} from '../../actions';

type DispatchFunc = (dispatch: any) => void;

export function createGoal(userId: string, goal: Goal): DispatchFunc {
    return dispatch => {
        dispatch(ActionCreators.SET_CREATE_GOAL(true));
        /*fetch(router.users(userId).goals(), {
            method:'POST',
            body: goal,
        })*/
        dispatch(ActionCreators.CREATE_GOAL(Object.assign({}, goal, {
            id: Math.random(),
        })));
        dispatch(ActionCreators.SET_CREATE_GOAL(false));
    }
}

export function replaceGoal(goalId: number, goal: Goal): DispatchFunc {
    return dispatch => {
        // TODO: contact the server or whatever
        dispatch(ActionCreators.DELETE_GOAL(goalId));
        dispatch(ActionCreators.CREATE_GOAL(goal));
    }
}
