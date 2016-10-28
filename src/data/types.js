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

export type Reminder = {

}

export type RepeatedReminder = {

}

export type Goal = {
    status: GoalStatusEnum,
    name: string,
    description: string,
    img: string,
    tasks: {[id:string]:Task},
}

export type Task = {
    name: string,
    description: string,
    status: TaskStatusEnum,
    reminder?: Reminder,
    repeatedReminder?: RepeatedReminder,
}
