import {combineReducers} from 'redux';
import {
    DELETE_GOAL,
    UPDATE_GOAL,
    DELETE_TASK,
    UPDATE_TASK,
    CREATE_GOAL_WITH_ID,
    CREATE_TASK_WITH_ID,
} from '../actions/donit';

const initUserData = {
        username:"",
}

// reducer that creates task data in terms of collection
function tasks(state = {}, action) {
    if (action == undefined) {
        return {};
    }
    switch(action.type){
    case UPDATE_TASK: 
        // TODO
    case CREATE_TASK_WITH_ID:
        let withNewTask ={};
        withNewTask[action.task.id] = action.task;
        return Object.assign({}, state, withNewTask);
    case DELETE_TASK: 
        let newTask = Object.assign({}, state);
        delete newTask[action.id];
        return newTask;
    default: 
        return state;
    }
}

// reducer that creates goal data in terms of collection
function goals(state = {}, action){
    if (action == undefined){
        return {}
    }
    let gs = null;
    switch(action.type){
    case DELETE_TASK:               // propagate the action
    case CREATE_TASK_WITH_ID:       // to the tasks
        gs = Object.assign({},state);
        gs[action.goalid].tasks = tasks(gs[action.goalid].tasks, action); 
        return gs;
    case UPDATE_GOAL:
        // TODO
    case CREATE_GOAL_WITH_ID:
        let newState = {};
        newState[action.goal.id] = action.goal
        return Object.assign({},state, newState);
    case DELETE_GOAL:
        gs = Object.assign({},state);
        delete gs[action.id];
        return gs;
    default:
        return state;
    }
}

// contains user's data and action on user data
function user(state = initUserData, action){
    if (action == undefined){
        return initUserData;
    }
    switch (action.type) {
        default: 
            return state;
    }
}

export var userGoal = combineReducers({
    user,
    goals
})