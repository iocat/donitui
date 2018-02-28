// @flow
// This file contains structure of the reducer

import type {
    Goal,
    StatusEnum,
    Histories
} from './types';

export type UserService = {
    userId: number,
    signedIn: boolean,
    googleUser: any,
}

// generic action
export type Action = {
    // the action type
    type: number,
    // the payload
    [id: string]: any,
}

export type Filter = {
    byStatuses: {[id: StatusEnum]: boolean},
    gids: number[],
}


export type Event = {
    // the time to trigger the event
    // in milliseconds in Epoch
    at: number,
    endTime: number,
    nextStatus: StatusEnum,
    goalId: number,
    isHabit: boolean,
    id: number,
}


export type ActiveTask = {
    goalId: number,
    isHabit: boolean,
    id: number,
    // in miliseconds
    endTime: number,
}

export type Scheduler = {
    // the current time from Epoch in miliseconds
    now: number,
    // the list of event coming up next
    eventHeap: Event[],
    // the currently active tasks
    activeTasks: ActiveTask[],

    // the return values of set current time
    // the list of tasks whose status needed to be changed
    // events are pushed when the current time passed the scheduled time
    statusChange: Event[],
}

export type GoalTracking = {
    // the title of the web page
    pageTitle: string,

    scheduler: Scheduler,
    // the original goal list which is sorted by created time
    gids: number[],
    // The list of goals which are done
    done: number[],
    // The list of goals which are not done (but are not in progress)
    notDone: number[],
    // The list of goals which are in progress
    inProgress: number[],
    // A dictionary of goals with unique goals' id
    goals: {[id: number]: Goal},
    histories: Histories,
    filter: Filter,
}

// for UI components to react to networking I/O overhead
export type Networking = {
    // create a goal
    creatingGoal: boolean,
}

export type RootReducer = {
    goalTracking: GoalTracking,
    userService: UserService,
}
