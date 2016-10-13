import {combineReducers} from 'redux';
import goals from './goal-tracking/goals';
import filter from './goal-tracking/filter';

export var GoalTracking = combineReducers({
    Goals: goals,   // The list of goals corresponding to that user
    Filter: filter, // The goal filter
})
