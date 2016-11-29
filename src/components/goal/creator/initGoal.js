// @flow
import { GoalVisibility, GoalStatus } from '../../../data/index';
import type {Goal} from '../../../data/types';

const EMPTY_GOAL = {
    id: "not_created",
    name:"",
    description:"",
    img:"",
    status: GoalStatus.NOT_DONE,
    visibility: GoalVisibility.PRIVATE,
    tasks: [],
}

// making sure that the goal has all valid fields
export default (goal:?Goal): Goal => {
    if (goal === undefined || goal === null){
        return EMPTY_GOAL;
    }
    return Object.assign({}, EMPTY_GOAL, goal);
}
