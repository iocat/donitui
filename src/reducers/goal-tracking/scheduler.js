// @flow
import type {
    $Scheduler,
    $Action
} from '../../data/reducers';

import {
    ActionTypes,
} from '../../actions';

import eventHeap from './eventHeap';

export default function scheduler(state: ?$Scheduler, action : $Action): $Scheduler {
    if (state === undefined || state === null) {
        return {
            eventHeap: [],
            preprocessTime: 0,
            now: new Date().getTime(),
        }
    }
    switch(action.type) {
        case ActionTypes.SET_CURRENT_TIME:
            return Object.assign({},state, {
                now: action.time,
            });
        case ActionTypes.PREPROCESS_SCHEDULER:
            // build preprocess the scheduler to sort the handling events
            return Object.assign({}, state, {
                eventHeap: eventHeap(state.eventHeap, action),
                preprocessTime: action.preprocessTime,
            });
        default:
            return state;
    }
}
