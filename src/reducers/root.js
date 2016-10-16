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


// getUserGoals gets all the goals tracked by the goal tracker
export function getUserGoals(root){
    return root.GoalTracking.Goals;
}

// getGoalFilter gets the filter from the goal tracker
export function getGoalFilter(root){
    return root.GoalTracking.Filter
}