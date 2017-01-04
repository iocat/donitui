// @flow
import {ActionTypes} from '../../actions';
import type { Habit } from '../../data/types';
import { Status, EVERYDAY } from '../../data/index';
import { getHabitStatus }from '../../timeutils';
import type {Action} from '../../data/reducers';

export function habit(state: ?Habit, action: ?Action): Habit{
    if(state === undefined || state === null || action == null) {
        return {
            name: "",
            status: Status.INACTIVE,
            duration: 60,
            days: EVERYDAY,
            offset: 0,
        }
    }
    switch (action.type){
    case ActionTypes.SET_HABIT_STATUS:
        // TODO: ??
        return Object.assign({},state, {
            status: action.status,
        });
    case ActionTypes.LOAD_GOAL:
    case ActionTypes.CREATE_GOAL:
        return Object.assign({},state, {
            status: getHabitStatus(state, action.now),
        });
    default:
        return state;
    }
}

// reducer that creates task data in terms of normalized key collection
export function habits(state: Habit[], action: Action): Habit[] {
    if (state === undefined) {
        return [];
    }
    let newState: Habit[] = state.slice();
    switch (action.type) {
        case ActionTypes.SET_HABIT_STATUS:
            // TODO?
            newState[action.taskId] = habit(newState[action.taskId],action);
            return newState;
        case ActionTypes.LOAD_GOAL:
        case ActionTypes.CREATE_GOAL:
            let i = 0;
            while(i < newState.length){
                newState[i] = habit(newState[i], action);
                i++;
            }
            return newState;
        default:
            return state;
    }
}
