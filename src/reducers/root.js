import {
    CREATE_GOAL, 
    DELETE_GOAL, 
    DELETE_TASK, 
    CREATE_TASK, 
    UPDATE_TASK
} from '../actions/donit';

import {combineReducers} from 'redux';
import {userGoal} from './user';
import {followers} from './followers';

var initRootState = {};

// The global app reducer
export var root = combineReducers({
    userGoal, 
    followers,
})