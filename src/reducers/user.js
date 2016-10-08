import {combineReducers} from 'redux';
import {SET_USER_STATUS} from '../actions/user';
import {handleError} from '../actions/error';
import {goals} from './goals';
import router from '../routing/router';
import 'whatwg-fetch';

const initUserData = {
    username: "",
}

export var userGoal = combineReducers({
    user,   // The global user state
    goals   // The list of goals corresponding to that user
})

// contains user's data and action on user data
function user(state = initUserData, action) {
    if (action === undefined) {
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

// TODO
export function retrieveUserData(forUser) {
    return function (dispatch) {
        var checkStatus = (response) => {

        }
        var normalize = (json) => {

        }
        fetch(router.user(forUser).url())
            .then(checkStatus)
            .then(
            (response) => response.json()
            ).then(normalize)
            .catch()(
            function (error) {
                dispatch(handleError(error));
            }
            )
    }
}