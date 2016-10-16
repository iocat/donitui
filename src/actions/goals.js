// GOAL action set
export const CREATE_GOAL = "CREATE_GOAL";
// CREATE_XXX_WITH_ID is used in case the resource id is not generated on the 
// client side, the server generates the id then returns the result and 
// triggers an CREATE_XXX_WITH_ID action
export const CREATE_GOAL_WITH_ID = "CREATE_GOAL_WITH_ID";
export const DELETE_GOAL = "DELETE_GOAL";
export const SET_GOAL_VISIBILITY = "SET_GOAL_VISIBILITY";
export const SET_GOAL_STATUS     = "SET_GOAL_STATUS";
export const FILTER_GOAL_BY_STATUSES = "FILTER_GOAL_BY_STATUSES";


export function createGoal(goal){
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

export function filterGoalByStatuses(statuses){
    return{
        type: FILTER_GOAL_BY_STATUSES,
        statuses: statuses,
    }
}