import {combineReducers} from 'redux';
import {GoalTracking} from './GoalTracking';
import {followers} from './socializing/followers';
import {NotificationSystem} from './NotificationSystem';
import {UserService} from './UserService';

// The global app reducer
export var Root = combineReducers({
    GoalTracking: GoalTracking, 
    Socializing: followers,
    NotificationSystem,
    UserService,
});
