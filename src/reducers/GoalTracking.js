import { ActionTypes } from '../actions/index';
import { GoalStatus } from '../data/index';
import goals from './goal-tracking/goals';
import filter from './goal-tracking/filter';

// TODO: implement pagination
export default function GoalTracking(state, action) {
    if (state === undefined) {
        return {
            Goals: goals(undefined, action),
            Filter: filter(undefined, action),
        };
    }
    switch (action.type) {
        case ActionTypes.DELETE_GOAL:
        case ActionTypes.CREATE_GOAL_WITH_ID:
        case ActionTypes.SET_GOAL_VISIBILITY:
        case ActionTypes.CREATE_TASK_WITH_ID:
        case ActionTypes.DELETE_TASK:
        case ActionTypes.SET_TASK_STATUS:
            // TODO: refilter after mutate data
            return Object.assign({}, state, {
                Goals: goals(state.Goals, action),
            });
        case ActionTypes.FILTER_GOAL_BY_STATUSES:
        // TODO cache result as requests {[]: result}
            let keys = Object.keys(state.Goals);
            let filgids = []; // filtered gids
            // filter the ids here
            if (Object.keys(action.statuses).length === Object.keys(GoalStatus).length) {
                filgids = keys;
            }else{
                keys.forEach(function (key) {
                    if (action.statuses[state.Goals[key].status] === true) { // goal's status' matches the filter
                        filgids.push(key);
                    }
                })
            }
            let newFilter = Object.assign({}, filter(state.Filter, action), { gids: filgids });
            return Object.assign({}, state, { Filter: newFilter });
        default:
            return state;
    }
}