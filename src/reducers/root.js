import {combineReducers} from 'redux';
import {userGoal} from './user';
import {followers} from './followers';
import {notification} from './notification';

// The global app reducer
export var root = combineReducers({
    userGoal, 
    followers,
    notification,
})