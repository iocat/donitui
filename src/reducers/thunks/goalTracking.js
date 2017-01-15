import type {Goal} from '../../data/types';
import {ActionCreators} from '../../actions';
import 'whatwg-fetch';
import router from '../../routing/router';
import {CLIENT_DOMAIN} from '../../global';

type DispatchFunc = (dispatch: any) => void;

function convertToGoDate(goal){
    for (let task of goal.tasks){
        task.remindAt = task.remindAt.toISOString();
    }
}

function convertToJSDate(goal){
    for(let task of goal.tasks){
        task.remindAt = new Date(task.remindAt);
    }
}

export function createGoal(userId: string, goal: Goal): DispatchFunc {
    return (dispatch, getState) => {
        dispatch(ActionCreators.SET_CREATE_GOAL(true));
        convertToGoDate(goal);
        let reqBody = JSON.stringify({
            requester: getState().userService.userId,
            goal: goal,
        })
        console.log(reqBody)
        fetch(router.users(userId).goals().url(), {
            method:'POST',
            body: reqBody ,
            headers:{
                "Content-Type":"application/json",
                "Origin": CLIENT_DOMAIN,
            }
        }).then(
            (response)=>{
                if (response.ok){
                    let created = response.json()
                    convertToJSDate(created);
                    dispatch(ActionCreators.CREATE_GOAL({}, created))
                }else{
                    let err = response.json();
                    console.error(err);
                }
            },
            (err) => console.error("cannot fulfill the request", err)
        );
        dispatch(ActionCreators.SET_CREATE_GOAL(false));
    }
}

export function deleteGoal(userId: string, goalId: number) :DispatchFunc{
    return dispatch=>{
        dispatch(ActionCreators.DELETE_GOAL(goalId));
    }
}

export function replaceGoal(goalId: number, goal: Goal): DispatchFunc {
    return dispatch => {
        // TODO: contact the server or whatever
        dispatch(ActionCreators.DELETE_GOAL(goalId));
        dispatch(ActionCreators.CREATE_GOAL(goal));
    }
}
