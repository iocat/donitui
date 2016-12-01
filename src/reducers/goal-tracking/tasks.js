// @flow

import {
    ActionTypes
} from '../../actions';
import type {
    Task,
} from '../../data/types';
import task from './task';

// reducer that creates task data in terms of normalized key collection
export default function tasks(state: Task[], action: any): Task[] {
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
