// @flow
import {
    ActionTypes,
    ActionCreators,
} from '../actions';
import {
    GoalStatus,
    StatusFilter
} from '../data/index';
import goals from './goal-tracking/goals';
import filter from './goal-tracking/filter';
import scheduler from './goal-tracking/scheduler';
import type {
    $GoalTracking,
    $Action
} from '../data/reducers';
import type {
    Goal
} from '../data/types';

function pushToCorrespondingGids(goal: Goal,
    gids: string[], done: string[],
    notDone: string[], inProgress: string[]) {
    if (goal.id != null) {
        gids.push(goal.id);
        switch (goal.status) {
            case GoalStatus.DONE:
                done.push(goal.id);
                break;
            case GoalStatus.NOT_DONE:
                notDone.push(goal.id);
                break;
            case GoalStatus.IN_PROGRESS:
                inProgress.push(goal.id);
                break;
            default:
                console.log("unhandled case  " + goal.status);
        }
    }
}

function prependToCorrespondingGids(goal: Goal,
    gids: string[], done: string[],
    notDone: string[], inProgress: string[]) {
    if (goal.id != null) {
        gids.unshift(goal.id);
        switch (goal.status) {
            case GoalStatus.DONE:
                done.unshift(goal.id);
                break;
            case GoalStatus.NOT_DONE:
                notDone.unshift(goal.id);
                break;
            case GoalStatus.IN_PROGRESS:
                inProgress.unshift(goal.id);
                break;
            default:
                console.log("unhandled case  " + goal.status);
        }
    }
}

function loadGoals(state: $GoalTracking, action: $Action): $GoalTracking {
    let gt: $GoalTracking = state;
    for (let goal of action.goals) {
        // load individual goal
        gt = goalTracking(gt, ActionCreators.LOAD_GOAL(goal));
    }
    return gt;
}

function loadGoal(state: $GoalTracking, action: $Action): $GoalTracking {
    let newGSet: {
            [id: string]: Goal
        } = goals(state.goals, ActionCreators.goals_LOAD_GOAL(action.goal, state.scheduler.now)),
        done = state.done.slice(),
        notDone = state.notDone.slice(),
        inProgress = state.inProgress.slice(),
        gids = state.gids.slice();
    pushToCorrespondingGids(newGSet[action.goal.id], gids, done, notDone, inProgress);
    let beforeFilter =  Object.assign({}, state, {
        gids: gids,
        done: done,
        notDone: notDone,
        inProgress: inProgress,
        goals: newGSet,
        scheduler: scheduler(state.scheduler, action),
    });
    // refilter
    return goalTracking(beforeFilter, ActionCreators.FILTER_GOAL_BY_STATUSES(beforeFilter.filter.byStatuses));
}


function createGoal(state: $GoalTracking, action: $Action): $GoalTracking {
    let newGSet: {
            [id: string]: Goal
        } = goals(state.goals, ActionCreators.goals_CREATE_GOAL(action.goal, state.scheduler.now)),
        done = state.done.slice(),
        notDone = state.notDone.slice(),
        inProgress = state.inProgress.slice(),
        gids = state.gids.slice();
    prependToCorrespondingGids(newGSet[action.goal.id], gids, done, notDone, inProgress);
    let beforeFilter =  Object.assign({}, state, {
        gids: gids,
        done: done,
        notDone: notDone,
        inProgress: inProgress,
        goals: newGSet,
        scheduler: scheduler(state.scheduler, action),
    });
    // refilter
    return goalTracking(beforeFilter, ActionCreators.FILTER_GOAL_BY_STATUSES(beforeFilter.filter.byStatuses));
}

function deleteGoal(state: $GoalTracking, id:string): $GoalTracking {
    let gs: {
            [id: string]: Goal
        } = goals(state.goals, ActionCreators.DELETE_GOAL(id)),
        delG: ? Goal = state.goals[id],
        gids : string[] = state.gids.slice(),
        done: string[] = state.done.slice(),
        notDone: string[] = state.notDone.slice(),
        inProgress: string[] = state.inProgress.slice();
    gids.splice(gids.indexOf(id), 1);
    if (delG != null) {
        switch (delG.status) {
            case GoalStatus.DONE:
                done.splice(done.indexOf(id), 1);
                break;
            case GoalStatus.NOT_DONE:
                notDone.splice(notDone.indexOf(id), 1);
                break;
            case GoalStatus.IN_PROGRESS:
                inProgress.splice(inProgress.indexOf(id), 1);
                break;
            default:
                console.log("unhanlded case");
        }
    }

    let editedGT: $GoalTracking = Object.assign({}, state, {
        goals: gs,
        gids: gids,
        done: done,
        notDone: notDone,
        inProgress: inProgress,
    });
    // refilter goals
    return goalTracking(editedGT, ActionCreators.FILTER_GOAL_BY_STATUSES(editedGT.filter.byStatuses));
}

export default function goalTracking(state: ? $GoalTracking, action : $Action): $GoalTracking {
    if (state === undefined || state === null) {
        return {
            goals: goals(undefined, action),
            filter: filter(undefined, action),
            scheduler: scheduler(undefined, action),
            gids: [],
            done: [],
            notDone: [],
            inProgress: [],
        };
    }
    switch (action.type) {
        // take in a list of goals and APPEND them to the
        // corresponding categories, auto reorganize
        case ActionTypes.LOAD_GOALS:
            return loadGoals(state, action);
        case ActionTypes.CREATE_GOAL:
            return createGoal(state,action);
        case ActionTypes.LOAD_GOAL:
            return loadGoal(state, action);
        case ActionTypes.DELETE_GOAL:
            return deleteGoal(state, action.id);
        case ActionTypes.SET_CURRENT_TIME:
            return Object.assign({}, state, {
                scheduler: scheduler(state.scheduler, action),
            });
        case ActionTypes.FILTER_GOAL_BY_STATUSES:
            let filtered: string[] = [];
            if (action.statuses === StatusFilter.ALL){
                filtered = state.gids;
            }else if ( action.statuses === StatusFilter.DONE){
                filtered = state.done;
            }else if (action.statuses === StatusFilter.NOT_DONE){
                filtered = state.notDone;
            }else if (action.statuses === StatusFilter.IN_PROGRESS){
                filtered = state.inProgress;
            }else{
                console.error("does not allow manual filtering, got ", action.statuses);
                // manually filter
                let keys = state.gids;
                if (Object.keys(action.statuses).length === Object.keys(GoalStatus).length) {
                    filtered = keys;
                } else {
                    keys.forEach(function(key) {
                        if (state != null && action.statuses[state.goals[key].status] === true) { // goal's status' matches the filter
                            filtered.push(key);
                        }
                    })
                }
            }
            let newFilter = Object.assign({}, filter(state.filter, action), {
                gids: filtered,
            });
            return Object.assign({}, state, {
                filter: newFilter,
            });
        default:
            return state;
    }
}
