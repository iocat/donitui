import {
    CREATE_TASK_WITH_ID,
    DELETE_TASK,
    SET_TASK_STATUS,
} from '../actions/tasks';

// reducer that creates task data in terms of normalized key collection
export function tasks(state = {}, action) {
    if (action === undefined) {
        return {};
    }
    let newTask = null;
    switch(action.type){
    case CREATE_TASK_WITH_ID:
        let withNewTask ={};
        withNewTask[action.task.id] = action.task;
        return Object.assign({}, state, withNewTask);

    case DELETE_TASK: 
        newTask = Object.assign({}, state);
        delete newTask[action.id];
        return newTask;

    case SET_TASK_STATUS:
        newTask = Object.assign({}, state);
        newTask[action.id].status = action.status;
        return newTask;

    default: 
        return state;
    }
}

