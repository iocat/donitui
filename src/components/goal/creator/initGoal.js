// @flow
import type {Goal} from '../../../data/types';
import {goal} from '../../../reducers/goal-tracking/goals';

const EMPTY_GOAL: Goal =  goal(undefined, null);

// making sure that the goal has all valid fields
export default (goal:?Goal): Goal => {
    if (goal === undefined || goal === null){
        return EMPTY_GOAL;
    }
    return Object.assign({}, EMPTY_GOAL, goal);
}
