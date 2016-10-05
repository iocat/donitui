// Actions with Goal
export const CREATE_GOAL = 1
export const DELETE_GOAL = 2
export const UPDATE_GOAL = 3

export const DELETE_TASK = 4 
export const CREATE_TASK = 5
export const UPDATE_TASK = 6

// CREATE_XXX_WITH_ID is used in case the resource id is not generated on the 
// client side, the server generates the id then returns the result and 
// triggers an CREATE_XXX_WITH_ID action
export const CREATE_GOAL_WITH_ID = 7
export const CREATE_TASK_WITH_ID = 8

export function updateTask(taskid, task){
    return {
        type: UPDATE_TASK,
        id: taskid,
        task
    }
}

// addTask creates a new task
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

// deleteTask deletes a task
export function deleteTask(goalid, taskid){
    return{
        type: DELETE_TASK,
        goalid,
        id:taskid,
    }
}

// Action creator
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

// deleteGoal deletes a goal
export function deleteGoal(id){
    return {
        type: DELETE_GOAL,
        id
    }
}
