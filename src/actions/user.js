export const SET_USER_STATUS     = "SET_USER_STATUS";

export function setUserStatus(status){
    return {
        type: SET_USER_STATUS, 
        status,
    }
}