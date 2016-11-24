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
        }
    }
    switch(action.type) {
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
