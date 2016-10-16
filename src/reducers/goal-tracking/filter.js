import { GoalStatus } from '../../data/index';
import { ActionTypes } from '../../actions/index';

export default function filter(state, action) {
    if (state === undefined) {
        return {
            gids: [], // the gids filtered based on byStatuses
            byStatuses: {
                // only show what is in progress
                [GoalStatus.IN_PROGRESS]: false,
                [GoalStatus.DONE]: false,
                [GoalStatus.NOT_DONE]: false,
            },
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