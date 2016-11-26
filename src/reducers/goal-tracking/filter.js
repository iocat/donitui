// @flow
import {
    StatusFilter
} from '../../data/index';
import {
    ActionTypes
} from '../../actions';
import type {
    $Filter,
    $Action
} from '../../data/reducers';

export default function filter(state: ?$Filter, action: $Action): $Filter {
    if (state === undefined || state === null) {
        return {
            gids: [], // the gids filtered based on byStatuses
            byStatuses: StatusFilter.IN_PROGRESS,
        };
    }
    switch (action.type) {
        case ActionTypes.FILTER_GOAL_BY_STATUSES:
            return Object.assign({}, state, {
                byStatuses: action.statuses,
            })

        default:
            return state;
    }
}
