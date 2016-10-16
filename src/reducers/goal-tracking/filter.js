import { GoalStatus } from '../../data/index';
import { ActionTypes } from '../../actions/index';

export default function filter(state, action) {
    if (state === undefined) {
        let inf = {
            byStatuses: {
                // only show what is in progress
                [GoalStatus.IN_PROGRESS]: true,
            },
        };
        return inf;
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