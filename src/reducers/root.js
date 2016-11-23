// @flow
import {combineReducers} from 'redux';
import goalTracking from './goalTracking';

// The global app reducer
export var root = combineReducers({
    goalTracking,
});
