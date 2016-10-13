import {ActionTypes} from '../../actions/index';

// reducer that creates task data in terms of normalized key collection
export default function tasks(state , action) {
    if (state === undefined) {
        return {};
    }
    let newTask = null;
    switch (action.type) {

        case ActionTypes.CREATE_TASK_WITH_ID:
            newTask[action.task.id] = action.task;
            return Object.assign({}, state, newTask);

        case ActionTypes.DELETE_TASK:
            newTask = Object.assign({}, state);
            delete newTask[action.id];
            return newTask;

        case ActionTypes.SET_TASK_STATUS:
            newTask = Object.assign({}, state);
            newTask[action.id].status = action.status;
            return newTask;

        default:
            return state;
    }
}

