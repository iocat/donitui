// @flow
//


import type { Histories } from '../../data/types';
import type { Action } from '../../data/reducers';
import {ActionTypes} from '../../actions';

export default function(state: ?Histories, action: Action): Histories{
    if (state=== null || state === undefined){
        return [];
    }
    switch (action.type) {
        case ActionTypes.NEW_HISTORY:
            // TODO: unshift is inefficient, find a way to optimize
            state = state.slice();
            state.unshift(action.history);
            return state;
        case ActionTypes.DELETE_GOAL:
            state = state.slice();
            state = state.filter((history) => history.goalId !== action.goalId)
            return state;
        default:
            return state;
    }

}
