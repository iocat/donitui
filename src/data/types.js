// @flow

export type StatusEnum =
    | "DONE"
    | "INACTIVE"
    | "ACTIVE";

export type VisibilityEnum =
    | 0
    | 1
    | 2;

export type DaysInWeekEnum =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6;

export type UserStatusEnum =
    | "ONLINE"
    | "OFFLINE"
    | "BUSY";

export type HabitDays = {[id:number]:boolean}

export type Goal = {
    id: number,
    visibility: VisibilityEnum,
    status: StatusEnum,
    name: string,
    description: string,
    img: string,
    tasks: Task[],
    habits: Habit[],
}

export type Task = {
    name: string,
    status: StatusEnum,
    duration: number,
    remindAt: Date,
}

export type Habit = {
    name: string,
    status: StatusEnum,
    duration: number,
    days: HabitDays,
    offset: number,
}

export type HistoryTypeEnum =
    | "TASK_STARTED"
    | "TASK_ENDED"
    | "HABIT_STARTED"
    | "HABIT_ENDED"
    | "GOAL_ACHIEVED"

export type HistoryElem ={
    type: HistoryTypeEnum,
    at: number,
    goalId: number,
    // the task or the habit's id
    torhId: number
}

export type Histories = HistoryElem[];
