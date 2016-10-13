import { GoalStatus } from '../../actions/goals';
import { ActionTypes } from '../../actions/index';

export default function filter(state, action) {
    if (state === undefined) {
        let inf = {
            byStatuses: {},
        };
        inf.byStatuses[GoalStatus.DONE] = true;
        inf.byStatuses[GoalStatus.NOT_DONE] = true;
        inf.byStatuses[GoalStatus.IN_PROGRESS] = true;
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