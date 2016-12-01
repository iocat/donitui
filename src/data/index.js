// @flow

import type {
    GoalStatusEnum,
    GoalVisibilityEnum,
    TaskStatusEnum,
    UserStatusEnum,
    ReminderCycleEnum,
    HistoryTypeEnum
} from './types';

export const GoalStatus: {
    [id: string]: GoalStatusEnum
} = {
    DONE: "DONE",
    NOT_DONE: "NOT_DONE",
    IN_PROGRESS: "IN_PROGRESS",
}

export const GoalVisibility: {
    [id: string]: GoalVisibilityEnum
} = {
    PRIVATE: "PRIVATE",
    FOR_FOLLOWERS: "FOR_FOLLOWERS",
    PUBLIC: "PUBLIC",
}

export const TaskStatus: {
    [id: string]: TaskStatusEnum
} = GoalStatus

export const UserStatus: {
    [id: string]: UserStatusEnum
} = {
    OFFLINE: "OFFLINE",
    ONLINE: "ONLINE",
    BUSY: "BUSY",
}

export const ReminderCycle: {
    [id: string]: ReminderCycleEnum
} = {
    EVERY_DAY: "EVERY_DAY",
    EVERY_WEEK: "EVERY_WEEK",
    EVERY_MONTH: "EVERY_MONTH",
}

export const StatusFilter: {
    [id: string]: Object
} = {
    ALL: {
        [GoalStatus.DONE]: true,
        [GoalStatus.NOT_DONE]: true,
        [GoalStatus.IN_PROGRESS]: true,
    },
    DONE: {
        [GoalStatus.DONE]: true,
    },
    NOT_DONE: {
        [GoalStatus.NOT_DONE]: true,
    },
    IN_PROGRESS: {
        [GoalStatus.IN_PROGRESS]: true,
    },
}

export const HistoryType: {
    [id: string]: HistoryTypeEnum
} = {
    TASK_STARTED: "TASK_STARTED",
    TASK_ENDED: "TASK_ENDED",
    GOAL_ACHIEVED: "GOAL_ACHIEVED",
}
