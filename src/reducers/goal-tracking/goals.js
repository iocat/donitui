// @flow
import {
    ActionTypes
} from '../../actions';
import goal from './goal';
import type {
    Goal
} from '../../data/types';


// reducer that creates goal data in terms of normalized keys collection
export default function goals(state: ?{
    [id: string]: Goal
}, action : any): {
    [id: string]: Goal
} {
    if (state === undefined || state === null) {
        return {};
    }
    let gs = Object.assign({}, state);
    switch (action.type) {
        case ActionTypes.DELETE_GOAL:
            delete gs[action.id];
            return gs;
        case ActionTypes.SET_TASK_STATUS:
            console.log(action);
            gs[action.goalId] = goal(gs[action.goalId], action);
            return gs;
        // load the goal and categorize its current status
        case ActionTypes.CREATE_GOAL:
        case ActionTypes.LOAD_GOAL:
            gs[action.goal.id] = goal(action.goal, action);
            return gs;
        default:
            return state;
    }
}
