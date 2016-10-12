import {
    CREATE_GOAL,
    CREATE_GOAL_WITH_ID,
    DELETE_GOAL,
    SET_GOAL_VISIBILITY,
    SET_GOAL_STATUS,

    createGoal,
    createGoalWithID,
    deleteGoal,
    setGoalVisibility,
    setGoalStatus,
} from './goals';

import {
    CREATE_TASK,
    CREATE_TASK_WITH_ID,
    DELETE_TASK,
    SET_TASK_STATUS,

    createTask,
    createTaskWithID,
    deleteTask,
    setTaskStatus,
}from './tasks';

import {
    SET_USER_STATUS,

    setUserStatus,
}from './user';

import {
    HANDLE_ERROR,

    handleError,
}from './error';

// ActionTypes gathers all actions for ease of access
export const ActionTypes = {
    CREATE_GOAL: CREATE_GOAL,
    CREATE_GOAL_WITH_ID: CREATE_GOAL_WITH_ID,
    DELETE_GOAL: DELETE_GOAL,
    SET_GOAL_VISIBILITY: SET_GOAL_VISIBILITY,
    SET_GOAL_STATUS: SET_GOAL_STATUS,

    CREATE_TASK: CREATE_TASK,
    CREATE_TASK_WITH_ID: CREATE_TASK_WITH_ID,
    DELETE_TASK: DELETE_TASK,
    SET_TASK_STATUS: SET_TASK_STATUS,

    SET_USER_STATUS: SET_USER_STATUS,

    HANDLE_ERROR: HANDLE_ERROR,

    NORMALIZE: "NORMALIZE",
    DENORMALIZE: "DENORMALIZE",
}
// ActionCreators callback gathers the action creator associated with one action
export const ActionCreators = {
    CREATE_GOAL: createGoal,
    CREATE_GOAL_WITH_ID: createGoalWithID,
    DELETE_GOAL: deleteGoal,
    SET_GOAL_VISIBILITY: setGoalVisibility,
    SET_GOAL_STATUS: setGoalStatus,

    CREATE_TASK: createTask,
    CREATE_TASK_WITH_ID: createTaskWithID,
    DELETE_TASK: deleteTask,
    SET_TASK_STATUS: setTaskStatus,

    SET_USER_STATUS: setUserStatus,

    HANDLE_ERROR: handleError,

    NORMALIZE: (field) => { return {type: ActionTypes.NORMALIZE, byField: field}},
    DENORMALIZE: (field) => { return {type: ActionTypes.DENORMALIZE, byField: field}},
}