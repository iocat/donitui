// @flow

export type StatusEnum =
    | "DONE"
    | "INACTIVE"
    | "ACTIVE";

export type VisibilityEnum =
    | "PRIVATE"
    | "PUBLIC"
    | "FOLLOWERS";

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

type TaskStarted = {
    type: HistoryTypeEnum,
    // the time when the event is triggered
    at: number,
    // the goal
    taskName: string,
    goalName: string,
    goalId: number,
}

type TaskEnded = TaskStarted

type GoalAchieved = {
    type: HistoryTypeEnum,
    // the time when the event is triggered
    at: number,
    goalName: string,
    goalId: number,
}

export type HistoryElem =
    | TaskStarted
    | TaskEnded
    | GoalAchieved

export type Histories = HistoryElem[];
