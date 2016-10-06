import {combineReducers} from 'redux';
import {
    SET_USER_STATUS,
} from '../actions/donit';

const initUserData = {
    username:"",
}

export var userGoal = combineReducers({
    user,   // The global user state
    goals   // The list of goals corresponding to that user
})

// contains user's data and action on user data
function user(state = initUserData, action){
    if (action == undefined){
        return initUserData;
    }
    switch (action.type) {
        case SET_USER_STATUS:
            return Object.assign({}, state, {
                status: action.status,
            })
        default: 
            return state;
    }
}


