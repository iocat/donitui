import {ActionTypes} from '../actions/index';
import {combineReducers} from 'redux';

// TODO: show structure
const initUserData = {
    username: "",
}

// contains user's data and action on user data
function user(state = initUserData, action) {
    if (state === undefined) {
        return initUserData;
    }
    switch (action.type) {
        case ActionTypes.SET_USER_STATUS:
            return Object.assign({}, state, {
                status: action.status,
            })
        default:
            return state;
    }
}

export var UserService = combineReducers({
    User: user,
});