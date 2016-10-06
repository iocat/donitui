// Action's names
// USER action set
export const SET_USER_STATUS     = "SET_USER_STATUS";

// GOAL action set
export const CREATE_GOAL = "CREATE_GOAL";
// CREATE_XXX_WITH_ID is used in case the resource id is not generated on the 
// client side, the server generates the id then returns the result and 
// triggers an CREATE_XXX_WITH_ID action
export const CREATE_GOAL_WITH_ID = "CREATE_GOAL_WITH_ID";
export const DELETE_GOAL = "DELETE_GOAL";
export const SET_GOAL_VISIBILITY = "SET_GOAL_VISIBILITY";
export const SET_GOAL_STATUS     = "SET_GOAL_STATUS";

// TASK action set
export const CREATE_TASK = "CREATE_TASK";
export const CREATE_TASK_WITH_ID = "CREATE_TASK_WITH_ID";
export const DELETE_TASK = "DELETE_TASK";
export const SET_TASK_STATUS     = "SET_TASK_STATUS";

export const GoalVisibility = {
    PRIVATE: "PRIVATE",
    FOR_FOLLOWERS: "FOR_FOLLOWERS",
    PUBLIC: "PUBLIC",
}

export const GoalStatus = {
    DONE: "DONE",
    NOT_DONE: "NOT_DONE",
    IN_PROGRESS :"IN_PROGRESS",
}

export const UserStatus = {
    OFFLINE: "OFFLINE",
    ONLINE: "ONLINE",
    BUSY: "BUSY",
}

export const TaskStatus = GoalStatus;

export function setUserStatus(status){
    return {
        type: SET_USER_STATUS, 
        status,
    }
}

export function createGoal( goal){
    return {
        type: CREATE_GOAL,
        goal 
    }
}

export function createGoalWithID(goalid, goal){
    return{
        type: CREATE_GOAL_WITH_ID,
        id: goalid,
        goal
    }
}


export function deleteGoal(id){
    return {
        type: DELETE_GOAL,
        id
    }
}

export function setGoalVisibility(goalid, visibility){
    return{
        type: SET_GOAL_VISIBILITY,
        id: goalid,
        visibility,
    }
}

export function setGoalStatus(goalid, status){
    return {
        type: SET_GOAL_STATUS,
        id: goalid,
        status: status,
    }
}

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
