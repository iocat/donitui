// @flow
import type {
    Goal,
    GoalStatusEnum
} from './data/types';


// The registry of actions
export const ActionTypes: {
    [id: string]: number
} = {
    CREATE_GOAL_WITH_ID: 1,
    DELETE_GOAL: 2,
    FILTER_GOAL_BY_STATUSES: 3,
    LOAD_GOALS: 4,
    EVALUATE_GOAL_STATUS: 5,

    HANDLE_ERROR: 20,

    NORMALIZE: 21,
    DENORMALIZE: 22,
}

// ActionCreators callback gathers the action creator associated with one action
export const ActionCreators = {
    CREATE_GOAL_WITH_ID: (goalid: string, goal: Goal) => {
        return {
            type: ActionTypes.CREATE_GOAL_WITH_ID,
            id: goalid,
            goal
        }
    },
    DELETE_GOAL: (id: string) => {
        return {
            type: ActionTypes.DELETE_GOAL,
            id
        }
    },
    FILTER_GOAL_BY_STATUSES: (statuses: GoalStatusEnum) => {
        return {
            type: ActionTypes.FILTER_GOAL_BY_STATUSES,
            statuses: statuses,
        }
    },
    LOAD_GOALS: (goals: Goal[]) => {
        return {
            type: ActionTypes.LOAD_GOALS,
            goals: goals,
        };
    },
    EVALUATE_GOAL_STATUS: (time: Date): any => {
        return {
            type: ActionTypes.EVALUATE_GOAL_STATUS,
            time: time,
        }
    },

    HANDLE_ERROR: (error: string) => {
        return {
            type: ActionTypes.HANDLE_ERROR,
            error
        }
    },

    NORMALIZE: (field: string) => {
        return {
            type: ActionTypes.NORMALIZE,
            byField: field
        }
    },
    DENORMALIZE: (field: string) => {
        return {
            type: ActionTypes.DENORMALIZE,
            byField: field
        }
    },
}
