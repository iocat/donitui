// @flow
import {ActionTypes} from '../../actions';
import type { Task } from '../../data/types';
import { Status } from '../../data/index';
import { getTaskStatus }from '../../timeutils';

export function task(state: ?Task, action: any): Task{
    if(state === undefined || state === null) {
        return {
            name: "",
            status: Status.INACTIVE,
            duration: 60,
            remindAt: new Date()
        }
    }
    switch (action.type){
    case ActionTypes.SET_TASK_STATUS:
        return Object.assign({},state, {
            status: action.status,
        });
    case ActionTypes.LOAD_GOAL:
    case ActionTypes.CREATE_GOAL:
        return Object.assign({},state, {
            status: getTaskStatus(state, action.now),
        })
    default:
        return state;
    }
}

// reducer that creates task data in terms of normalized key collection
export function tasks(state: Task[], action: any): Task[] {
    if (state === undefined) {
        return [];
    }
    let newState: Task[] = state.slice();
    switch (action.type) {
        case ActionTypes.SET_TASK_STATUS:
            newState[action.taskId] = task(newState[action.taskId],action);
            return newState;
        case ActionTypes.LOAD_GOAL:
        case ActionTypes.CREATE_GOAL:
            let i = 0;
            while(i < newState.length){
                newState[i] = task(newState[i], action);
                i++;
            }
            return newState;
        default:
            return state;
    }
}
