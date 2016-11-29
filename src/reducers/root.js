// @flow
import {combineReducers} from 'redux';
import goalTracking from './goalTracking';
import userService from './userService';
// The global app reducer
export var root = combineReducers({
    goalTracking,
    userService,
});
