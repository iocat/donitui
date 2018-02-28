// @flow
import {ActionTypes} from '../actions';

import type {
    UserService,
    Action
}from '../data/reducers';

export default function(state: UserService, action: Action) : UserService {
    if (state === null || state === undefined){
        return {
            userId: -1,
            signedIn: false,
            googleUser: null,
        }
    }
    switch (action.type){
        case ActionTypes.USER_LOGIN:
            return Object.assign({}, state, {
                userId: action.userId,
                username: action.username,
                signedIn: true,
            })
        case ActionTypes.GOOGLE_USER_SIGN_IN:
            return Object.assign({}, state, {
                signedIn: true,
                userId: action.userId,
                googleUser: action.googleUser,
            })
        case ActionTypes.GOOGLE_USER_SIGN_OUT:
            return Object.assign({}, state, {
                signedIn: false,
                googleUser: action.googleUser,
            })
        default:
            return state;
    }
}
