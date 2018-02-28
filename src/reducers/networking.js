// @flow
//
import type{
    Networking,
    Action
} from '../data/reducers';
import {ActionTypes} from '../actions';

export default function (state: ?Networking, action: Action): Networking{
    if(state ==  null || state == undefined){
        return {
            creatingGoal: false,
        }
    }
    switch (action.type){
        case ActionTypes.SET_CREATE_GOAL:
            return Object.assign({}, state, {
                creatingGoal: action.creatingGoal,
            })
        default:
            return state;
    }
}
