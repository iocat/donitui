import type {Goal} from '../data/types';
import {ActionCreators} from '../actions';
import 'whatwg-fetch';
import router from '../routing/router';
import RequestBuilder from '../RequestBuilder';
import linkTo from '../routing/linkTo';
import {Status} from '../data/index';
type DispatchFunc = (dispatch: any) => void;

function convertToNetGoal(goal){

    for (let task of goal.tasks){
        task.remindAt = task.remindAt.toISOString();
        delete task.status
    }
    for (let habit of goal.habits){
        delete habit.status
    }
    delete goal.status;
}

function convertToJSGoal(goal){
    goal.tasks = goal.tasks.map((task) =>{
        let newTask = Object.assign({},
            task,{
                remindAt: new Date(task.remindAt),
            }
        );
        if(task.done === true){
            newTask.status = Status.DONE;
        }else{
            newTask.status = Status.INACTIVE;
        }
        return newTask;
    })
    goal.habits = goal.habits.map((habit)=>{
        let newHabit = Object.assign({}, habit);
        if(habit.done === true){
            newHabit.status = Status.DONE;
        }else{
            newHabit.status = Status.INACTIVE;
        }
        return newHabit;
    })
    if(goal.done === true){
        return Object.assign({}, goal,{
            status : Status.DONE,
        });
    }else{
        return Object.assign({}, goal,{
            status : Status.INACTIVE,
        });
    }
}

// tickCycle is the number of seconds, this only needs to be set ONCE
export function globalClockTick(tickCycle: number){
    return (dispatcher: any)=> {
        setInterval(
            ()=>dispatcher(ActionCreators.SET_CURRENT_TIME(new Date().getTime())),tickCycle
        )
    }
}

export function login(googleUser: any){
    return function(dispatch){
        fetch(router.login().url(),
            new RequestBuilder().method(RequestBuilder.METHOD_GET)
                    .googleAuth(googleUser.getAuthResponse().id_token)
                    .build())
        .then(function(response){
            if(response.ok){
                return response.json();
            }else{
                throw "error";
            }
        }).then(function(json){
            dispatch(ActionCreators.GOOGLE_USER_SIGN_IN(googleUser, json.currentUser.id));
            dispatch(ActionCreators.LOAD_GOALS(json.goals.map((goal)=>{
                convertToJSGoal(goal);
                return goal;
            })));
            linkTo.PERSONAL_TRACKING_VIEW(json.currentUser.id, true)();
            console.log("user signin", json)
        }).catch(function(err){
            console.error(err);
        })
    }
}

export function createGoal(goal: Goal): DispatchFunc {
    return (dispatch, getState) => {
        dispatch(ActionCreators.SET_CREATE_GOAL(true));
        convertToNetGoal(goal);
        fetch(router.users(getState().userService.userId).goals().url(),
                new RequestBuilder().method(RequestBuilder.METHOD_POST)
                .googleAuth(getState().userService.googleUser.getAuthResponse().id_token)
                .body(goal).content(RequestBuilder.CONTENT_JSON).build()
        ).then(function(response){
            if (response.ok){
                return response.json();
            }
            throw "error"
        }).then(function(created){
            convertToJSGoal(created);
            dispatch(ActionCreators.CREATE_GOAL(created))
        }).catch(
            err => console.error(err)
        );
        dispatch(ActionCreators.SET_CREATE_GOAL(false));
    }
}

export function allGoals(): DispatchFunc{
    return (dispatch, getState) =>{
        fetch(router.users(getState().userService.userId).url(),
            new RequestBuilder.method(RequestBuilder.Method_GET)
                .googleAuth(getState().userService.googleUser.getAuthResponse().id_token)
                .build()
        ).then(function(response){
                if(response.ok){
                    return response.json();
                }else{
                    throw new "error";
                }
            }
        ).then(function(goals){
            goals.map((goal)=>{
                convertToJSGoal(goal);
                return goal;
            })
            dispatch(ActionCreators.LOAD_GOALS(goals));
        }).catch(function(error){
            console.error(error);
        });
    }
}

export function deleteGoal(goalId: number) :DispatchFunc{
    return (dispatch, getState)=>{
        fetch(router.users(getState().userService.userId).goals(goalId).url(),
            new RequestBuilder.method(RequestBuilder.METHOD_DELETE)
                .googleAuth(getState().userService.googleUser.getAuthResponse().id_token)
                .build())
        .then(
            (response)=>{
                if(response.ok){
                    dispatch(ActionCreators.DELETE_GOAL(goalId));
                }else{
                    throw "error";
                }
            }
        ).catch(function(error){
            console.error(error);
        });

    }
}

export function replaceGoal(goalId: number, goal: Goal): DispatchFunc {
    return (dispatch, getState) => {
        fetch(router.users(getState().userService.userId).goals(goalId).url(),
            new RequestBuilder.method(RequestBuilder.METHOD_POST)
            .googleAuth(getState().userService.googleUser.getAuthResponse().id_token)
            .build())
        .then(function(response){
            if(response.ok){
                dispatch(ActionCreators.DELETE_GOAL(goalId));
                dispatch(ActionCreators.CREATE_GOAL(goal));
            }else{
                throw "error";
            }
        }).catch(function(error){
            console.error(error)
        })
    }
}
