// @flow

export type TaskStatusEnum =
    | "DONE"
    | "NOT_DONE"
    | "IN_PROGRESS";

export type GoalStatusEnum = TaskStatusEnum;

export type GoalVisibilityEnum =
    | "PRIVATE"
    | "PUBLIC"
    | "FOR_FOLLOWERS";

export type ReminderCycleEnum =
    | "EVERY_DAY"
    | "EVERY_WEEK"
    | "EVERY_MONTH";

export type DaysInWeekEnum =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7;

export type UserStatusEnum =
    | "ONLINE"
    | "OFFLINE"
    | "BUSY";

export type Reminder = {
    remindAt: Date,
    duration: number,
}

export type HabitDays = {[id:number]:boolean}

export type RepeatedReminder = {
    cycle: ReminderCycleEnum,
    remindAt: Date,
    days: HabitDays,
    duration: number,
}

export type Goal = {
    id: string,
    visibility: GoalVisibilityEnum,
    status: GoalStatusEnum,
    name: string,
    description: string,
    img: string,
    tasks: Task[],
}

export type Task = {
    name: string,
    status: TaskStatusEnum,
    reminder?: Reminder,
    repeatedReminder?: RepeatedReminder,
}
