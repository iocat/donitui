// @flow
import type {
    Goal,
    GoalStatusEnum
} from './data/types';

// generic action
type Action = {
    // the action type
    type: number,
    // the payload
    [id: string]: any,
}

type ActionCreator = (...x:any)=>Action;

// The registry of actions
export const ActionTypes: {
    [id: string]: number
} = {
    DELETE_GOAL: 2,
    FILTER_GOAL_BY_STATUSES: 3,
    LOAD_GOALS: 4,
    EVALUATE_GOAL_STATUS: 5,
    LOAD_GOAL: 6,

    HANDLE_ERROR: 20,

    NORMALIZE: 21,
    DENORMALIZE: 22,
}

// The registry of action creator
export const ActionCreators: {[id:string]:ActionCreator} = {
    DELETE_GOAL: (id: string): {
        type: number,
        id: string
    } => {
        return {
            type: ActionTypes.DELETE_GOAL,
            id
        }
    },
    FILTER_GOAL_BY_STATUSES: (statuses: GoalStatusEnum): {
        type: number,
        statuses: GoalStatusEnum
    } => {
        return {
            type: ActionTypes.FILTER_GOAL_BY_STATUSES,
            statuses: statuses,
        }
    },
    // loadGoals with goal status according to the load time
    LOAD_GOALS: (goals: Goal[], loadAt: Date): {
        type: number,
        goals: Goal[],
        now: Date,
    } => {
        return {
            type: ActionTypes.LOAD_GOALS,
            goals: goals,
            now: loadAt,
        };
    },
    // loadGoalWithId with the goal status according to the load time
    LOAD_GOAL: (goal:Goal, loadAt: Date):{
        type: number,
        goal: Goal,
        now: Date,
    } => {
        return {
            type: ActionTypes.LOAD_GOAL,
            goal:goal,
            now: loadAt,
        };
    },
    EVALUATE_GOAL_STATUS: (time: Date): {
        type: number,
        time: Date
    } => {
        return {
            type: ActionTypes.EVALUATE_GOAL_STATUS,
            time: time,
        }
    },

    HANDLE_ERROR: (error: string): {
        type: number,
        error: string
    } => {
        return {
            type: ActionTypes.HANDLE_ERROR,
            error
        }
    },

    NORMALIZE: (field: string): {
        type: number,
        byField: string
    } => {
        return {
            type: ActionTypes.NORMALIZE,
            byField: field
        }
    },
    DENORMALIZE: (field: string): {
        type: number,
        byField: string
    } => {
        return {
            type: ActionTypes.DENORMALIZE,
            byField: field
        }
    },

}
