import {ActionTypes,ActionCreators} from '../../actions/index';
import {GoalStatus,GoalVisibility,} from '../../actions/goals';

import 'whatwg-fetch';
import router from '../../routing/router';
import tasks from './tasks';

const initGoalData = {
    id: "",
    name: "",
    description: "",
    lastUpdated: null,
    status: GoalStatus.NOT_DONE,
    pictureUrl: "",
    visibility: GoalVisibility.PRIVATE,

    tasks: {},
}

function goal(state = {}, action) {
    if (action === undefined) {
        return initGoalData;
    }
    switch (action.type) {
        case ActionTypes.SET_GOAL_VISIBILITY:
            return Object.assign({}, state, {
                visibility: action.visibility,
            })
        case ActionTypes.SET_GOAL_STATUS:
            return Object.assign({}, state, {
                status: action.status,
            })
        case ActionTypes.CREATE_GOAL_WITH_ID:
            return Object.assign({}, action.goal);
        default:
            return state;
    }
}

// reducer that creates goal data in terms of normalized keys collection
export function goals(state = {}, action) {
    if (action === undefined) {
        return {}
    }
    let gs = null;
    switch (action.type) {
        case ActionTypes.DELETE_GOAL:
            gs = Object.assign({}, state);
            delete gs[action.id];
            return gs;

        case ActionTypes.CREATE_GOAL_WITH_ID:
        case ActionTypes.SET_GOAL_VISIBILITY:
        case ActionTypes.SET_GOAL_STATUS:
            gs = Object.assign({}, state);
            gs[action.id] = goal(gs[action.id], action);
            return gs;

        case ActionTypes.CREATE_TASK_WITH_ID:       // propagate the action
        case ActionTypes.DELETE_TASK:               // to the tasks
        case ActionTypes.SET_TASK_STATUS:
            gs = Object.assign({}, state);
            gs[action.goalid].tasks = tasks(gs[action.goalid].tasks, action);
            return gs;
        default:
            return state;
    }
}

// goalsBackEnd is a thunk to request data from the server
//todo
export function retrieveBackEndGoals(forUser) {
    return function (dispatch) {
        var checkStatus = (response) => {

        }
        let ok = true;
        var errorHandler = (error) =>{
            dispatch(ActionCreators.HANDLE_ERROR(error));
            ok = false;
        }
        
        let json = fetch(router.user(forUser).goals(null).url())
            .then(checkStatus)
            .then( (response) => response.json())
            .catch(errorHandler);
        if (ok) {
            // Dispatch create goal with id
        }
    }
}