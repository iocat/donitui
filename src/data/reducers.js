// @flow
// This file contains structure of the reducer

import type { Goal, GoalStatusEnum } from './types';

export type $NotificationSystem = {

}

export type $Socializing = {

}

export type $User = {
    username: string,
}

export type $UserService = {
    User: $User,
}

// generic action
export type $Action = {
    // the action type
    type: number,
    // the payload
    [id: string]: any,
}

export type $Filter = {
    byStatuses: {[id:GoalStatusEnum]:boolean},
    gids: number[],
}

export type $Scheduler = {

}

export type $GoalTracking = {
    Scheduler: $Scheduler,
    // the original goal list which is sorted by created time
    Gids: string[],
    // The list of goals which are done
    Done: string[],
    // The list of goals which are not done (but are not in progress)
    NotDone: string[],
    // The list of goals which are in progress
    InProgress: string[],

    // A dictionary of goals with unique goals' id
    Goals: {[id:string]:Goal},
    Filter: $Filter,
}

export type $RootReducer = {
    GoalTracking: $GoalTracking,
    UserService: $UserService,
    Socializing: $Socializing,
    NotificationSystem: $NotificationSystem,
}
