// @flow
//
//

import {ActionTypes} from '../actions';

import type {
    $UserService,
    $Action
}from '../data/reducers';

export default function(state: $UserService, action: $Action) : $UserService {
    if (state === null || state === undefined){
        return {
            userId: "",
        }
    }
    switch (action.type){
        case ActionTypes.USER_LOGIN:
            return Object.assign({}, state, {
                userId: action.userId,
            })
        default:
            return state;
    }
}
