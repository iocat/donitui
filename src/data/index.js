// @flow

import type {VisibilityEnum, StatusEnum, UserStatusEnum,
    HabitDays, HistoryTypeEnum } from './types';

export const Status: {[id: string]: StatusEnum} = {
    DONE: "DONE",
    NOT_DONE: "INACTIVE",
    IN_PROGRESS: "ACTIVE",
}

export const Visibility: {[id: string]: VisibilityEnum} = {
    PRIVATE: "PRIVATE",
    FOR_FOLLOWERS: "FOLLOWERS",
    PUBLIC: "PUBLIC",
}

export const DaysInWeek: {[id:string]:number} = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
}

export const EVERYDAY = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true
}

export const UserStatus: {
    [id: string]: UserStatusEnum
} = {
    OFFLINE: "OFFLINE",
    ONLINE: "ONLINE",
    BUSY: "BUSY",
}

export const StatusFilter: {
    [id: string]: Object
} = {
    ALL: {
        [Status.ACTIVE]: true,
        [Status.INACTIVE]: true,
        [Status.DONE]: true,
    },
    DONE: {
        [Status.DONE]: true,
    },
    INACTIVE: {
        [Status.INACTIVE]: true,
    },
    ACTIVE: {
        [Status.ACTIVE]: true,
    },
}

export const HistoryType: {
    [id: string]: HistoryTypeEnum
} = {
    TASK_STARTED: "TASK_STARTED",
    TASK_ENDED: "TASK_ENDED",
    GOAL_ACHIEVED: "GOAL_ACHIEVED",
}
