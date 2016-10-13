import {GoalStatus} from './goals';

// TASK action set
export const CREATE_TASK = "CREATE_TASK";
export const CREATE_TASK_WITH_ID = "CREATE_TASK_WITH_ID";
export const DELETE_TASK = "DELETE_TASK";
export const SET_TASK_STATUS     = "SET_TASK_STATUS";

export const TaskStatus = GoalStatus

export function createTask(goalid, task){
    return{
        type: CREATE_TASK,
        goalid,
        task,
    }
}

export function createTaskWithID(goalid, taskid, task){
    return{
        type: CREATE_TASK_WITH_ID,
        goalid,
        id: taskid,
        task,
    }
}

export function deleteTask(goalid, taskid){
    return{
        type: DELETE_TASK,
        goalid,
        id:taskid,
    }
}

export function setTaskStatus(goalid, taskid, status){
    return {
        type: SET_TASK_STATUS,
        goalid,
        id: taskid,
        status,
    }
}
