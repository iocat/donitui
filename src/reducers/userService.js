// @flow
//
//

import {ActionTypes} from '../actions';

import type {
    UserService,
    Action
}from '../data/reducers';

export default function(state: UserService, action: Action) : UserService {
    if (state === null || state === undefined){
        return {
            userId: 0,
            username: "",
            signedIn: false,
        }
    }
    switch (action.type){
        case ActionTypes.USER_LOGIN:
            return Object.assign({}, state, {
                userId: action.userId,
                username: action.username,
                signedIn: true,
            })
        default:
            return state;
    }
}
