// @flow
import {
    ActionTypes,
    ActionCreators,
} from '../actions';
import {
    GoalStatus,
    TaskStatus,
    StatusFilter
} from '../data/index';
import goals from './goal-tracking/goals';
import filter from './goal-tracking/filter';
import scheduler from './goal-tracking/scheduler';
import type {
    $GoalTracking,
    $Action,
    $ScheduledTaskEvent,
    $Scheduler
} from '../data/reducers';
import type {
    Goal,
    TaskStatusEnum,
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
    console.log(action)
    let newGSet: {
            [id: string]: Goal
        } = goals(state.goals, ActionCreators.goals_LOAD_GOAL(action.goal, state.scheduler.now)),
        done = state.done.slice(),
        notDone = state.notDone.slice(),
        inProgress = state.inProgress.slice(),
        gids = state.gids.slice();
    pushToCorrespondingGids(newGSet[action.goal.id], gids, done, notDone, inProgress);
    let beforeFilter = Object.assign({}, state, {
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
    let beforeFilter = Object.assign({}, state, {
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

function deleteGoal(state: $GoalTracking, action: $Action): $GoalTracking {
    let gs: {
            [id: string]: Goal
        } = goals(state.goals, action),
        delG: ? Goal = state.goals[action.id],
        gids : string[] = state.gids.slice(),
        done: string[] = state.done.slice(),
        notDone: string[] = state.notDone.slice(),
        inProgress: string[] = state.inProgress.slice();
    gids.splice(gids.indexOf(action.id), 1);
    if (delG != null) {
        switch (delG.status) {
            case GoalStatus.DONE:
                done.splice(done.indexOf(action.id), 1);
                break;
            case GoalStatus.NOT_DONE:
                notDone.splice(notDone.indexOf(action.id), 1);
                break;
            case GoalStatus.IN_PROGRESS:
                inProgress.splice(inProgress.indexOf(action.id), 1);
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
        scheduler: scheduler(state.scheduler, action),
    });
    // refilter goals
    return goalTracking(editedGT, ActionCreators.FILTER_GOAL_BY_STATUSES(editedGT.filter.byStatuses));
}

function setCurrentTime(state: $GoalTracking, action: $Action): $GoalTracking {
    let newSched: $Scheduler = scheduler(state.scheduler, action);
    if (newSched.statusChange.length === 0) {
        return Object.assign({}, state, {
            scheduler: newSched,
        });
    }
    let statusChanges: $ScheduledTaskEvent[] = newSched.statusChange;
    // clear the return list
    let newState: $GoalTracking = Object.assign({}, state, {
        scheduler: Object.assign({}, newSched, {
            statusChange: [],
        }),
    });
    // for each event reevaluate the corresponding goal and task statuses
    for (let event of statusChanges) {
        if (event.toStart === true) {
            newState = goalTracking(newState, ActionCreators.SET_TASK_STATUS(event.goalId, event.taskId, TaskStatus.IN_PROGRESS));
        } else {
            if (newState.goals[event.goalId].tasks[event.taskId].reminder) {
                newState = goalTracking(newState, ActionCreators.SET_TASK_STATUS(event.goalId, event.taskId, TaskStatus.DONE));
            } else if (newState.goals[event.goalId].tasks[event.taskId].repeatedReminder) {
                newState = goalTracking(newState, ActionCreators.SET_TASK_STATUS(event.goalId, event.taskId, TaskStatus.NOT_DONE));
            }
        }
    }
    return newState;
}

function setTaskStatus(state: $GoalTracking, action: $Action) :$GoalTracking{
    let newState: $GoalTracking = Object.assign({}, state, {
        goals: goals(state.goals, action),
    });
    let oldStatus: TaskStatusEnum = state.goals[action.goalId].status,
        newStatus: TaskStatusEnum = newState.goals[action.goalId].status;
    if (newStatus === oldStatus) {
        return newState;
    }
    let done = state.done.slice(),
        notDone = state.notDone.slice(),
        inProgress = state.inProgress.slice();
    // remove the goal from the corresponding list
    switch (oldStatus){
        case GoalStatus.DONE:
            done.splice(done.indexOf(action.goalId), 1);
            break;
        case GoalStatus.NOT_DONE:
            notDone.splice(notDone.indexOf(action.goalId), 1);
            break;
        case GoalStatus.IN_PROGRESS:
            inProgress.splice(inProgress.indexOf(action.goalId), 1);
            break;
        default:
            console.log("error: unhandled goal status");
    }
    // add the goal to the corresponding list
    let insertPos: number = 0,// the insert position
        listToInsert: string[] = [];
    switch (newStatus) {
        case GoalStatus.DONE:
            listToInsert = done;
            break;
        case GoalStatus.NOT_DONE:
            listToInsert = notDone;
            break;
        case GoalStatus.IN_PROGRESS:
            listToInsert = inProgress;
            break;
        default:
            console.log("error: unhandled goal status");
    }
    // insert to the correct position that maintains the original order of loaded goals
    for (let gid: string of newState.gids){
        if(insertPos < listToInsert.length){
            if(gid === action.goalId){
                listToInsert.splice(insertPos, 0, action.goalId);
                break;
            }else if (gid === listToInsert[insertPos]){
                insertPos ++;
            }
        }else{
            // insert to the end of the array
            listToInsert.splice(insertPos, 0, action.goalId);
        }
    }

    // refilter
    return goalTracking(Object.assign({}, newState, {
        done: done,
        notDone: notDone,
        inProgress: inProgress,
    }), ActionCreators.FILTER_GOAL_BY_STATUSES(newState.filter.byStatuses));
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
            pageTitle: "Donit: Personal Goal Tracker",
        };
    }
    switch (action.type) {
        // take in a list of goals and APPEND them to the
        // corresponding categories, auto reorganize
        case ActionTypes.LOAD_GOALS:
            return loadGoals(state, action);
        case ActionTypes.CREATE_GOAL:
            return createGoal(state, action);
        case ActionTypes.LOAD_GOAL:
            return loadGoal(state, action);
        case ActionTypes.DELETE_GOAL:
            return deleteGoal(state, action);
        case ActionTypes.SET_TASK_STATUS:
            return setTaskStatus(state, action);
        case ActionTypes.SET_CURRENT_TIME:
            return setCurrentTime(state, action);
        case ActionTypes.FILTER_GOAL_BY_STATUSES:
            let filtered: string[] = [];
            if (action.statuses === StatusFilter.ALL) {
                filtered = state.gids;
            } else if (action.statuses === StatusFilter.DONE) {
                filtered = state.done;
            } else if (action.statuses === StatusFilter.NOT_DONE) {
                filtered = state.notDone;
            } else if (action.statuses === StatusFilter.IN_PROGRESS) {
                filtered = state.inProgress;
            } else {
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
