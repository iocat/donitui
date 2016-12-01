// @flow
// This file contains structure of the reducer

import type {
    Goal,
    GoalStatusEnum,
    Histories
} from './types';

export type $UserService = {
    userId: string,
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
    gids: string[],
}


export type $ScheduledTaskEvent = {
    // the time to trigger the event
    // in milliseconds in Epoch
    at: number,
    // false, if this task is ending
    // true, if this task is starting
    toStart: boolean,
    // the index of the goal in the goal dictionary
    goalId: string,
    // the index the task belongs to in the goal
    taskId: number,

    endTime: number,
}


export type $ActiveTask = {
    goalId: string,
    taskId: number,
    // in miliseconds
    endTime: number,
}

export type $Scheduler = {
    // the current time from Epoch in miliseconds
    now: number,
    // the list of event coming up next
    eventHeap: $ScheduledTaskEvent[],
    // the currently active tasks
    activeTasks: $ActiveTask[],

    // the return values of set current time
    // the list of tasks whose status needed to be changed
    // events are pushed when the current time passed the scheduled time
    statusChange: $ScheduledTaskEvent[],
}

export type $GoalTracking = {
    // the title of the web page
    pageTitle: string,

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
    histories: Histories,
    filter: $Filter,
}

export type $RootReducer = {
    goalTracking: $GoalTracking,
    userService: $UserService,
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
