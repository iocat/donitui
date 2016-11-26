// @flow
// This file contains structure of the reducer

import type {
    Goal,
    GoalStatusEnum
} from './types';

export type $NotificationSystem = {

}

export type $Socializing = {

}

export type $User = {
    username: string,
}

export type $UserService = {
    user: $User,
}

// generic action
export type $Action = {
    // the action type
    type: number,
    // the payload
    [id: string]: any,
}

export type $Filter = {
    byStatuses: {
        [id: GoalStatusEnum]: boolean
    },
    gids: number[],
}


export type $ScheduledTaskEvent = {
    // the time to trigger the event
    at: number,
    // false, if this task is ending
    // true, if this task is starting
    toStart: boolean,
    // the index of the goal in the goal dictionary
    goalIndex: string,
    // the index the task belongs to in the goal
    taskIndex: number,
}

export type $Scheduler = {
    // the current time from Epoch in miliseconds
    now: number,
    // the list of event coming up next
    eventHeap: $ScheduledTaskEvent[],
    // the time the scheduler is first booted up and tasks are loaded to the
    // upNext event
    preprocessTime: number,
}

export type $GoalTracking = {
    scheduler: $Scheduler,
    // the original goal list which is sorted by created time
    gids: string[],
    // The list of goals which are done
    done: string[],
    // The list of goals which are not done (but are not in progress)
    notDone: string[],
    // The list of goals which are in progress
    inProgress: string[],
    // A dictionary of goals with unique goals' id
    goals: {
        [id: string]: Goal
    },
    filter: $Filter,
}

export type $RootReducer = {
    goalTracking: $GoalTracking,
    userService: $UserService,
    socializing: $Socializing,
    notificationSystem: $NotificationSystem,
}

// HELPER FUNCTION TO RETRIEVE THE CHILDREN REDUCERS' DATA

// getUserGoals gets all the goals tracked by the goal tracker
export function getUserGoals(root: $RootReducer) {
    return root.goalTracking.goals;
}

// getGoalFilter gets the filter from the goal tracker
export function getGoalFilter(root: $RootReducer) {
    return root.goalTracking.filter
}
