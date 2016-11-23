// @flow
import type {
    $Scheduler,
    $Action
} from '../../data/reducers';

import {
    ActionTypes,
    ActionCreators,
} from '../../actions';

export default function scheduler(state: ?$Scheduler, action : $Action): $Scheduler {
    if (state === undefined) {
        return {

        }
    }
    switch(action.type) {
        default:
            if (state != null){
                return state;
            }
            return {};
    }
}
