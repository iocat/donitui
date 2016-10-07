import {
    CREATE_GOAL_WITH_ID,
    DELETE_GOAL,
    SET_GOAL_VISIBILITY,
    SET_GOAL_STATUS,
} from '../actions/goals';

import {
    CREATE_TASK_WITH_ID,
    DELETE_TASK,
    SET_TASK_STATUS,
} from '../actions/tasks';

import {
    handleError
}from '../actions/error';

import 'whatwg-fetch';
import router from '../routing/router';
import {
    tasks
} from './tasks';

// reducer that creates goal data in terms of normalized keys collection
export function goals(state = {}, action){
    if (action === undefined){
        return {}
    }
    let gs = null;
    switch(action.type){
    case CREATE_GOAL_WITH_ID:
        let newState = {};
        newState[action.id] = action.goal
        return Object.assign({},state, newState);

    case DELETE_GOAL:
        gs = Object.assign({},state);
        delete gs[action.id];
        return gs;

    case SET_GOAL_VISIBILITY:
        gs = Object.assign({},state);
        gs[action.id].visibility = action.visibility; 
        return gs;

    case SET_GOAL_STATUS:
        gs = Object.assign({},state);
        gs[action.goalid].status = action.status;
        return gs;

    case CREATE_TASK_WITH_ID:       // propagate the action
    case DELETE_TASK:               // to the tasks
    case SET_TASK_STATUS:
        gs = Object.assign({},state);
        gs[action.goalid].tasks = tasks(gs[action.goalid].tasks, action); 
        return gs;
   
    default:
        return state;
    }
}

// TODO
// goalsBackEnd is a thunk to request data from the database
export function retrieveBackEndGoals(forUser) {
    return function(dispatch){
        var checkStatus = (response) =>{
            
        }
        var normalize  = (json) =>{

        }
        fetch(router.user(forUser).goals(null).url())
        .then(checkStatus)
        .then(
            (response) =>  response.json()
        ).then(normalize)
        .catch()(
            function(error){
                dispatch(handleError(error));
            }
        );

    }
}