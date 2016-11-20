// @flow
import {
    ActionTypes
} from '../../actions';
import goal from './goal';
import type {
    Goal
} from '../../data/types';


// reducer that creates goal data in terms of normalized keys collection
export default function goals(state: ? {
    [id: string]: Goal
}, action : any): {
    [id: string]: Goal
} {
    if (state === undefined) {
        return {}
    }
    let gs = null;
    switch (action.type) {
        case ActionTypes.DELETE_GOAL:
            gs = Object.assign({}, state);
            delete gs[action.id];
            return gs;

        case ActionTypes.CREATE_GOAL_WITH_ID:
            gs = Object.assign({}, state);
            gs[action.id] = goal(action.goal, action);
            return gs;
        default:
            if (state != null) {
                return state;
            }
            return {};
    }
}
