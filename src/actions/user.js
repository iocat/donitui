// Action's names
// USER action set
import {
    GoalStatus,
} from './goals';

export const SET_USER_STATUS     = "SET_USER_STATUS";

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