import {
    ActionTypes
} from '../../actions';
import type {
    Task
} from '../../data/types';

// reducer that creates task data in terms of normalized key collection
export default function tasks(state: Task[], action: any): Task[] {
    if (state === undefined) {
        return [];
    }
    switch (action.type) {
        case ActionTypes.EVALUATE_GOAL_STATUS:

            // TODO
            return []
        default:
            return state;
    }
}
