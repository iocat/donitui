// @flow
import type {
    Goal,
    GoalStatusEnum,
    TaskStatusEnum,
    HistoryElem,
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
    DELETE_GOAL: 1,
    FILTER_GOAL_BY_STATUSES: 2,
    LOAD_GOALS: 3,
    LOAD_GOAL: 4, // push a goal to the end of the goal lists
    CREATE_GOAL: 5, // create a goals and prepend to the front of the goal lists
    SET_TASK_STATUS: 6, // set a task status
    // goalTracking + scheduler
    SET_CURRENT_TIME: 7,
    RECEIVE_TASK: 8, // scheduler receives a task and evaluates its status
    // goalTracking + histories
    NEW_HISTORY: 9,

    USER_LOGIN: 10,
    // error handler
    HANDLE_ERROR: 100,

    // utilities
    NORMALIZE: 101,
    DENORMALIZE: 102,
}

function assertUniqueActionValues() {
    let keys: string[] = Object.keys(ActionTypes),
        seen: {
            [id: number]: boolean
        } = {};
    for (let k: string of keys) {
        let hasSeen: ? boolean = seen[ActionTypes[k]];
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
    LOAD_GOALS: (goals: Goal[]): {
        type: number,
        goals: Goal[],
    } => {
        return {
            type: ActionTypes.LOAD_GOALS,
            goals: goals,
        }
    },

    LOAD_GOAL: (goal: Goal): {
        type: number,
        goal: Goal,
    } => {
        return {
            type: ActionTypes.LOAD_GOAL,
            goal: goal,
        }
    },

    // loadGoalWithId with the goal status according to the load time
    goals_LOAD_GOAL: (goal: Goal, now: number): {
        type: number,
        goal: Goal,
        now: number,
    } => {
        return {
            type: ActionTypes.LOAD_GOAL,
            goal: goal,
            now: now,
        };
    },
    CREATE_GOAL: (goal: Goal): {
        type: number,
        goal: Goal,
    } => {
        return {
            type: ActionTypes.CREATE_GOAL,
            goal: goal,
        }
    },
    goals_CREATE_GOAL: (goal: Goal, now: number): {
        type: number,
        goal: Goal,
        now: number,
    } => {
        return {
            type: ActionTypes.CREATE_GOAL,
            goal: goal,
            now: now,
        }
    },

    SET_TASK_STATUS: (goalId: string, taskId: number, status: TaskStatusEnum ):{
        type: number,
        goalId: string,
        taskId: number,
        status: TaskStatusEnum,
    }=>{
        return {
            type: ActionTypes.SET_TASK_STATUS,
            goalId,
            taskId,
            status,
        }
    },

    SET_CURRENT_TIME: (time: number): {
        type: number,
        now: number
    } => {
        return {
            type: ActionTypes.SET_CURRENT_TIME,
            now: time,
        };
    },

    sched_RECEIVE_TASK: (goal: Goal, taskId: number):{type: number,goal: Goal,taskId: number} => {
        return {
            type: ActionTypes.RECEIVE_TASK,
            goal: goal,
            taskId: taskId,
        };
    },

    NEW_HISTORY: (helem: HistoryElem): {type: number, history: HistoryElem}=>{
        return {
            type: ActionTypes.NEW_HISTORY,
            history: helem,
        };
    },

    USER_LOGIN: (userId: string):{type: number, userId: string} =>{
        return {
            type: ActionTypes.USER_LOGIN,
            userId: userId,
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
