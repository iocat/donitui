// @flow
import type {
    Goal,
    GoalStatusEnum
} from './data/types';

import type {
    $Action
} from './data/reducers';

type ActionCreator = (...x: any) => $Action;

// The registry of actions
export const ActionTypes: {
    [id: string]: number
} = {
    // goalTracking
    DELETE_GOAL: 2,
    FILTER_GOAL_BY_STATUSES: 3,
    LOAD_GOALS: 4,
    EVALUATE_GOAL_STATUS: 5,
    LOAD_GOAL: 6, // push a goal to the end of the goal lists
    CREATE_GOAL: 7, // create a goals and prepend to the front of the goal lists

    PREPROCESS_SCHEDULER: 10, // goalTracking + scheduler
    SET_CURRENT_TIME: 11,

    // error handler
    HANDLE_ERROR: 20,

    // utilities
    NORMALIZE: 21,
    DENORMALIZE: 22,
}

function assertUniqueActionValues() {
    let keys: string[] = Object.keys(ActionTypes),
        seen: {
            [id: number]: boolean
        } = {};
    for (let k: string of keys) {
        let hasSeen: ?boolean = seen[ActionTypes[k]];
        if (hasSeen !== undefined && hasSeen === true) {
            console.error("Action type is duplicated, got: " + k + " with duplicated key: " + ActionTypes[k] +
                ". Expect every action type to have a unique value.");
        } else {
            seen[ActionTypes[k]] = true;
        }
    }
};
assertUniqueActionValues();


// The registry of action creator
export const ActionCreators: {
    [id: string]: ActionCreator
} = {
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
    LOAD_GOAL: (goal: Goal, loadAt: Date): {
        type: number,
        goal: Goal,
        now: Date,
    } => {
        return {
            type: ActionTypes.LOAD_GOAL,
            goal: goal,
            now: loadAt,
        };
    },
    CREATE_GOAL: (goal: Goal, createAt: Date):{
        type: number,
        goal: Goal,
        now: Date,
    }=>{
        return {
            type: ActionTypes.CREATE_GOAL,
            goal: goal,
            now: createAt,
        }
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

    PREPROCESS_SCHEDULER: (time: Date): {
        type: number,
        preprocessTime: number
    } => {
        return {
            type: ActionTypes.PREPROCESS_SCHEDULER,
            preprocessTime: time.getTime(),
        }
    },
    // propagated by GoalTracking to the scheduler
    _PREPROCESS_SCHEDULER: (time: number, inProgress: string[],
            notDone: string[], goals: {[id:string]:Goal}) :{
        type: number,
        preprocessTime: number,
        inProgress: string[],
        notDone: string[],
        goals: {[id:string]:Goal},
    } => {
        return {
            type: ActionTypes.PREPROCESS_SCHEDULER,
            preprocessTime: time,
            inProgress: inProgress,
            notDone: notDone,
            goals: goals,
        };
    },

    SET_CURRENT_TIME: (time: Date):{type: number, time: number} =>{
        return {
            type: ActionTypes.SET_CURRENT_TIME,
            time: time.getTime(),
        };
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
