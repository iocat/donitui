// @flow

import type {VisibilityEnum, StatusEnum, UserStatusEnum,
    HistoryTypeEnum, DaysInWeekEnum } from './types';

export const Status: {DONE: StatusEnum, ACTIVE: StatusEnum, INACTIVE: StatusEnum} = {
    DONE: "DONE",
    INACTIVE: "INACTIVE",
    ACTIVE: "ACTIVE",
}

export const Visibility: {
    PRIVATE: VisibilityEnum,
    FOLLOWERS: VisibilityEnum,
    PUBLIC: VisibilityEnum
} = {
    PRIVATE: 0,
    FOLLOWERS: 1,
    PUBLIC: 2,
}

export const DaysInWeek: {
    Sunday: DaysInWeekEnum,
    Monday: DaysInWeekEnum,
    Tuesday: DaysInWeekEnum,
    Wednesday: DaysInWeekEnum,
    Thursday: DaysInWeekEnum,
    Friday: DaysInWeekEnum,
    Saturday: DaysInWeekEnum,
} = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
}

export const EVERYDAY = {
    "0": true,
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true
}

export const UserStatus: {
    [id: string]: UserStatusEnum
} = {
    OFFLINE: "OFFLINE",
    ONLINE: "ONLINE",
    BUSY: "BUSY",
}

export const StatusFilter: {
    ALL: {[id:StatusEnum]:boolean},
    DONE: {[id:StatusEnum]:boolean},
    INACTIVE: {[id:StatusEnum]:boolean},
    ACTIVE: {[id:StatusEnum]:boolean}
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
    TASK_STARTED: HistoryTypeEnum,
    TASK_ENDED: HistoryTypeEnum,
    GOAL_ACHIEVED: HistoryTypeEnum,
    HABIT_STARTED: HistoryTypeEnum,
    HABIT_ENDED: HistoryTypeEnum
} = {
    TASK_STARTED: "TASK_STARTED",
    TASK_ENDED: "TASK_ENDED",
    GOAL_ACHIEVED: "GOAL_ACHIEVED",
    HABIT_STARTED: "HABIT_STARTED",
    HABIT_ENDED: "HABIT_ENDED"
}
