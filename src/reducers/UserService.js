import {ActionTypes} from '../actions/index';
import {handleError} from '../actions/error';
import router from '../routing/router';
import 'whatwg-fetch';
import {combineReducers} from 'redux';

// TODO: show structure
const initUserData = {
    username: "",
}

// contains user's data and action on user data
function user(state = initUserData, action) {
    if (action === undefined) {
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

export var UserService = combineReducers({
    User: user,
});