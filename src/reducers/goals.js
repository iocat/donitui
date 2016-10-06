import {
    CREATE_GOAL_WITH_ID,
    DELETE_GOAL,
    SET_GOAL_VISIBILITY,
    SET_GOAL_STATUS,

    CREATE_TASK_WITH_ID,
    DELETE_TASK,
    SET_TASK_STATUS,
} from '../actions/donit';

import {
    tasks
} from './tasks';

// reducer that creates goal data in terms of normalized keys collection
function goals(state = {}, action){
    if (action == undefined){
        return {}
    }
    let gs = null;
    switch(action.type){
    case CREATE_GOAL_WITH_ID:
        let newState = {};
        newState[action.goal.id] = action.goal
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