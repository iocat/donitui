// @flow
import type { Goal, StatusEnum, HistoryElem,} from './data/types';
// The registry of actions
export const ActionTypes: {
    DELETE_GOAL: number,
    FILTER_GOAL_BY_STATUSES: number,
    LOAD_GOALS: number,
    LOAD_GOAL: number,
    CREATE_GOAL: number,
    SET_TASK_STATUS: number,
    SET_HABIT_STATUS: number,
    SET_CURRENT_TIME: number,
    RECEIVE_TASK: number,
    RECEIVE_HABIT:  number,
    NEW_HISTORY: number,
    USER_LOGIN: number,
    SET_CREATE_GOAL: number,
    GOOGLE_USER_SIGN_IN: number,
    GOOGLE_USER_SIGN_OUT:number,
    HANDLE_ERROR: number,
    NORMALIZE: number,
    DENORMALIZE: number,
} = {
    // goalTracking
    DELETE_GOAL: 1,
    FILTER_GOAL_BY_STATUSES: 2,
    LOAD_GOALS: 3,
    LOAD_GOAL: 4, // push a goal to the end of the goal lists
    CREATE_GOAL: 5, // create a goals and prepend to the front of the goal lists
    SET_TASK_STATUS: 6, // set a task status
    SET_HABIT_STATUS: 7,
    // goalTracking + scheduler
    SET_CURRENT_TIME: 8,
    RECEIVE_TASK: 9, // scheduler receives a task and evaluates its status
    RECEIVE_HABIT: 10,
    // goalTracking + histories
    NEW_HISTORY: 11,

    USER_LOGIN: 12,

    SET_CREATE_GOAL: 50,
    GOOGLE_USER_SIGN_IN: 51,
    GOOGLE_USER_SIGN_OUT: 52,
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
    DELETE_GOAL: (goalId: number) => {type: number, goalId: number},
    FILTER_GOAL_BY_STATUSES: (s: {[id: StatusEnum]: boolean} ) => {type: number, statuses: {[id: StatusEnum]: boolean}},
    LOAD_GOALS: (goals: Goal[]) => {type: number, goals: Goal[]},
    LOAD_GOAL: (goal: Goal) => {type: number, goal: Goal},
    goals_LOAD_GOAL: (goal: Goal, now: number) =>{type: number, goal: Goal, now: number},
    goals_CREATE_GOAL: (goal: Goal, now: number) => {type: number, goal: Goal, now: number} ,
    CREATE_GOAL: (goal: Goal) => {type: number, goal: Goal},
    SET_TASK_STATUS: (goalId: number, taskId: number, status: StatusEnum, when:number ) => {type: number,goalId: number,taskId: number,status: StatusEnum, when: number },
    SET_HABIT_STATUS: (goalId: number, habitId: number, status: StatusEnum, when:number) => {type: number, goalId: number, habitId: number, status: StatusEnum, when: number},
    SET_CURRENT_TIME: (time: number) => {type: number,now: number},
    sched_RECEIVE_TASK: (goal: Goal, taskId: number) => {type: number,goal: Goal,taskId: number},
    sched_RECEIVE_HABIT: (goal: Goal, habitId: number)=>{type: number, goal: Goal, habitId: number},
    NEW_HISTORY: (helem: HistoryElem)=>{type: number, history: HistoryElem},
    USER_LOGIN: (username: string, userId: number) => {type: number, username: string, userId: number},
    SET_CREATE_GOAL: (isCreating: boolean) => {type: number, creatingGoal:boolean},
    HANDLE_ERROR: (error: string) => {type: number,error: string},
    NORMALIZE: (field: string) => {type: number,byField: string},
    DENORMALIZE: (field: string) => {type: number, byField: string},
    GOOGLE_USER_SIGN_IN: (googleUser: any, userId: string)=> {type: number, userId:string, googleUser: any},
    GOOGLE_USER_SIGN_OUT: ()=>{type: number},
} = {
    DELETE_GOAL: (goalId: number): {type: number,goalId: number} => {
        return {
            type: ActionTypes.DELETE_GOAL,
            goalId
        }
    },
    FILTER_GOAL_BY_STATUSES: (statuses: {[id: StatusEnum]: boolean}): {type: number, statuses: {[id: StatusEnum]: boolean}} => {
        return {
            type: ActionTypes.FILTER_GOAL_BY_STATUSES,
            statuses: statuses,
        }
    },
    LOAD_GOALS: (goals: Goal[]): {type: number,goals: Goal[]} => {
        return {
            type: ActionTypes.LOAD_GOALS,
            goals: goals,
        }
    },

    LOAD_GOAL: (goal: Goal): {type: number,goal: Goal} => {
        return {
            type: ActionTypes.LOAD_GOAL,
            goal: goal,
        }
    },

    // loadGoalWithId with the goal status according to the load time
    goals_LOAD_GOAL: (goal: Goal, now: number): {type: number, goal: Goal,now: number} => {
        return {
            type: ActionTypes.LOAD_GOAL,
            goal: goal,
            now: now,
        };
    },
    CREATE_GOAL: (goal: Goal): {type: number,goal: Goal} => {
        return {
            type: ActionTypes.CREATE_GOAL,
            goal: goal,
        }
    },
    goals_CREATE_GOAL: (goal: Goal, now: number): {type: number, goal: Goal, now: number} => {
        return {
            type: ActionTypes.CREATE_GOAL,
            goal: goal,
            now: now,
        }
    },

    SET_TASK_STATUS: (goalId: number, taskId: number, status: StatusEnum, when: number ):{type: number,goalId: number,taskId: number,status: StatusEnum, when: number}=>{
        return {
            type: ActionTypes.SET_TASK_STATUS,
            goalId,
            taskId,
            status,
            when
        }
    },

    SET_HABIT_STATUS: (goalId: number, habitId: number, status: StatusEnum, when: number):{type: number, goalId: number, habitId: number, status: StatusEnum, when: number}=>{
        return {
            type: ActionTypes.SET_HABIT_STATUS,
            goalId,
            habitId,
            status,
            when
        }
    },

    SET_CURRENT_TIME: (time: number): {type: number,now: number} => {
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

    sched_RECEIVE_HABIT: (goal: Goal, habitId: number):{type: number, goal: Goal, habitId: number} =>{
        return {
            type: ActionTypes.RECEIVE_HABIT,
            goal: goal,
            habitId: habitId,
        }
    },

    NEW_HISTORY: (helem: HistoryElem): {type: number, history: HistoryElem}=>{
        return {
            type: ActionTypes.NEW_HISTORY,
            history: helem,
        };
    },

    USER_LOGIN: (username, userId):{type: number, username: string, userId: number} =>{
        return {
            type: ActionTypes.USER_LOGIN,
            username: username,
            userId: userId,
        }
    },

    SET_CREATE_GOAL: (isCreating: boolean):{type: number, creatingGoal:boolean} =>{
        return {
            type: ActionTypes.SET_CREATE_GOAL,
            creatingGoal: isCreating,
        }
    },

    HANDLE_ERROR: (error: string): {type: number,error: string} => {
        return {
            type: ActionTypes.HANDLE_ERROR,
            error
        }
    },

    NORMALIZE: (field: string): {type: number,byField: string} => {
        return {
            type: ActionTypes.NORMALIZE,
            byField: field
        }
    },
    DENORMALIZE: (field: string): {type: number, byField: string} => {
        return {
            type: ActionTypes.DENORMALIZE,
            byField: field
        }
    },
    GOOGLE_USER_SIGN_IN:(googleUser: any, userId: string) =>{
        return {
            type: ActionTypes.GOOGLE_USER_SIGN_IN,
            userId,
            googleUser
        }
    },
    GOOGLE_USER_SIGN_OUT:()=>{
        return {
            type: ActionTypes.GOOGLE_USER_SIGN_OUT,
        }
    }
}
