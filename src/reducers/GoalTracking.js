import {combineReducers} from 'redux';
import {goals} from './goal-tracking/goals';

export var GoalTracking = combineReducers({
    Goals: goals,   // The list of goals corresponding to that user
})
