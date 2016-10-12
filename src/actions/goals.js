// GOAL action set
export const CREATE_GOAL = "CREATE_GOAL";
// CREATE_XXX_WITH_ID is used in case the resource id is not generated on the 
// client side, the server generates the id then returns the result and 
// triggers an CREATE_XXX_WITH_ID action
export const CREATE_GOAL_WITH_ID = "CREATE_GOAL_WITH_ID";
export const DELETE_GOAL = "DELETE_GOAL";
export const SET_GOAL_VISIBILITY = "SET_GOAL_VISIBILITY";
export const SET_GOAL_STATUS     = "SET_GOAL_STATUS";

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

export function setGoalStatus(goalid, status){
    return {
        type: SET_GOAL_STATUS,
        id: goalid,
        status: status,
    }
}
