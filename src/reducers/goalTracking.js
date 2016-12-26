// @flow
import { ActionTypes, ActionCreators } from '../actions';
import {Status, StatusFilter, HistoryType } from '../data/index';
import { goals } from './goal-tracking/goals';
import filter from './goal-tracking/filter';
import scheduler from './goal-tracking/scheduler';
import histories from './goal-tracking/histories';
import type { GoalTracking, Action, Event, Scheduler} from '../data/reducers';
import type { Goal, StatusEnum } from '../data/types';

function addToGidLists(goal: Goal,
    gids: number[], done: number[],
    notDone: number[], inProgress: number[],
    addFunc: (list: number[], num: number) => void) {
    if (goal.id != null) {
        addFunc(gids, goal.id)
        switch (goal.status) {
            case Status.DONE:
                addFunc(done, goal.id)
                break;
            case Status.INACTIVE:
                addFunc(notDone, goal.id)
                break;
            case Status.ACTIVE:
                addFunc(inProgress, goal.id)
                break;
            default:
                console.log("unhandled case  " + goal.status);
        }
    }
}

const pushFunc = (list: number[], num: number):void => {list.push(num)};
const prependFunc = (list: number[], num: number): void => {list.unshift(num)};

function loadGoals(state:  GoalTracking, action:  Action):  GoalTracking {
    let gt:  GoalTracking = state;
    for (let goal of action.goals) {
        // load individual goal
        gt = goalTracking(gt, ActionCreators.LOAD_GOAL(goal));
    }
    return gt;
}

function loadGoal(state:  GoalTracking, action:  Action):  GoalTracking {
    let newGSet: {[id: number]: Goal} = goals(state.goals, ActionCreators.goals_LOAD_GOAL(action.goal, state.scheduler.now)),
        done = state.done.slice(),
        notDone = state.notDone.slice(),
        inProgress = state.inProgress.slice(),
        gids = state.gids.slice();
    addToGidLists(newGSet[action.goal.id], gids, done, notDone, inProgress, pushFunc);
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


function createGoal(state:  GoalTracking, action:  Action):  GoalTracking {
    let newGSet: {[id: number]: Goal} = goals(state.goals, ActionCreators.goals_CREATE_GOAL(action.goal, state.scheduler.now)),
        done = state.done.slice(),
        notDone = state.notDone.slice(),
        inProgress = state.inProgress.slice(),
        gids = state.gids.slice();
    addToGidLists(newGSet[action.goal.id], gids, done, notDone, inProgress, prependFunc);
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

function deleteGoal(state:  GoalTracking, action:  Action):  GoalTracking {
    let gs: {[id: number]: Goal} = goals(state.goals, action),
        delG: ? Goal = state.goals[action.id],
        gids : number[] = state.gids.slice(),
        done: number[] = state.done.slice(),
        notDone: number[] = state.notDone.slice(),
        inProgress: number[] = state.inProgress.slice();
    gids.splice(gids.indexOf(action.id), 1);
    if (delG != null) {
        switch (delG.status) {
            case Status.DONE:
                done.splice(done.indexOf(action.id), 1);
                break;
            case Status.INACTIVE:
                notDone.splice(notDone.indexOf(action.id), 1);
                break;
            case Status.ACTIVE:
                inProgress.splice(inProgress.indexOf(action.id), 1);
                break;
            default:
                console.log("unhanlded case");
        }
    }

    let editedGT:  GoalTracking = Object.assign({}, state, {
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

function setCurrentTime(state:  GoalTracking, action:  Action):  GoalTracking {
    let newSched:  Scheduler = scheduler(state.scheduler, action);
    if (newSched.statusChange.length === 0) {
        return Object.assign({}, state, {
            scheduler: newSched,
        });
    }
    let statusChanges: Event[] = newSched.statusChange;
    // clear the return list
    let newState:  GoalTracking = Object.assign({}, state, {
        scheduler: Object.assign({}, newSched, {
            statusChange: [],
        }),
    });
    // for each event reevaluate the corresponding goal and task statuses
    for (let event of statusChanges) {
        if (event.isHabit){
            newState = goalTracking(newState, ActionCreators.SET_HABIT_STATUS(event.goalId, event.id, event.nextStatus));
        }else{
            newState = goalTracking(newState, ActionCreators.SET_TASK_STATUS(event.goalId, event.id, event.nextStatus));
        }
    }
    return newState;
}

function goalStatusChange(state: GoalTracking, goalId: number, from: StatusEnum): GoalTracking{
    let newState: GoalTracking = Object.assign({}, state),
        to: StatusEnum = newState.goals[goalId].status;
    if (to === from) {
        console.error("status did not change")
        return newState;
    }
    if (to === Status.DONE) {
        newState = goalTracking(newState, ActionCreators.NEW_HISTORY(
            {
                type: HistoryType.GOAL_ACHIEVED,
                at: newState.scheduler.now,
                goalName: newState.goals[goalId].name,
                goalId: goalId,
            }
        ))
    }
    let done = newState.done.slice(),
        notDone = newState.notDone.slice(),
        inProgress = newState.inProgress.slice();
    // remove the goal from the corresponding list
    switch (from){
        case Status.DONE:
            done.splice(done.indexOf(goalId), 1);
            break;
        case Status.INACTIVE:
            notDone.splice(notDone.indexOf(goalId), 1);
            break;
        case Status.ACTIVE:
            inProgress.splice(inProgress.indexOf(goalId), 1);
            break;
        default:
            console.log("error: unhandled goal status");
    }
    // add the goal to the corresponding list
    let insertPos: number = 0,// the insert position
        listToInsert: number[] = [];
    switch (to) {
        case Status.DONE:
            listToInsert = done;
            break;
        case Status.INACTIVE:
            listToInsert = notDone;
            break;
        case Status.ACTIVE:
            listToInsert = inProgress;
            break;
        default:
            console.log("error: unhandled goal status");
    }
    // insert to the correct position that maintains the original order of loaded goals
    for (let gid of newState.gids){
        if(insertPos < listToInsert.length){
            if(gid === goalId){
                console.log(listToInsert);
                console.log(gid);
                listToInsert.splice(insertPos, 0, goalId);
                break;
            }else if (gid === listToInsert[insertPos]){
                insertPos ++;
            }
        }else{
            // insert to the end of the array
            listToInsert.splice(insertPos, 0, goalId);
            break;
        }
    }
    // refilter
    return goalTracking(Object.assign({}, state, {
        done: done,
        notDone: notDone,
        inProgress: inProgress,
    }), ActionCreators.FILTER_GOAL_BY_STATUSES(newState.filter.byStatuses));
}


function setTaskStatus(state:  GoalTracking, action:  Action) : GoalTracking{
    let newState:  GoalTracking = Object.assign({}, state, {
        goals: goals(state.goals, action),
    });
    if (action.status === Status.ACTIVE){
        newState = goalTracking(newState, ActionCreators.NEW_HISTORY(
            {
                type: HistoryType.TASK_STARTED,
                at: newState.scheduler.now,
                taskName: newState.goals[action.goalId].tasks[action.taskId].name,
                goalName: newState.goals[action.goalId].name,
                goalId: action.goalId,
            }
        ));
    }else{
        newState = goalTracking(newState, ActionCreators.NEW_HISTORY(
        {
            type: HistoryType.TASK_ENDED,
            at: newState.scheduler.now,
            taskName: newState.goals[action.goalId].tasks[action.taskId].name,
            goalName: newState.goals[action.goalId].name,
            goalId: action.goalId,
        }
        ));
    }
    let oldStat: StatusEnum = state.goals[action.goalId].status,
        newStat: StatusEnum = newState.goals[action.goalId].status;
    if(newStat !== oldStat) {
        return Object.assign({},newState, goalStatusChange(newState, action.goalId, oldStat))
    }
    return newState;
}

function setHabitStatus(state: GoalTracking, action: Action): GoalTracking{
    let newState:  GoalTracking = Object.assign({}, state, {
        goals: goals(state.goals, action),
    });
    if (action.status === Status.ACTIVE){
        newState = goalTracking(newState, ActionCreators.NEW_HISTORY(
            {
                type: HistoryType.HABIT_STARTED,
                at: newState.scheduler.now,
                taskName: newState.goals[action.goalId].habits[action.habitId].name,
                goalName: newState.goals[action.goalId].name,
                goalId: action.goalId,
            }
        ));
    }else{
        newState = goalTracking(newState, ActionCreators.NEW_HISTORY(
            {
                type: HistoryType.HABIT_ENDED,
                at: newState.scheduler.now,
                taskName: newState.goals[action.goalId].habits[action.habitId].name,
                goalName: newState.goals[action.goalId].name,
                goalId: action.goalId,
            }
        ));
    }
    let oldStat: StatusEnum = state.goals[action.goalId].status,
        newStat: StatusEnum = newState.goals[action.goalId].status;
    if ( newStat !== oldStat) {
        return Object.assign({},newState, goalStatusChange(newState, action.goalId, oldStat))
    }
    return newState;
}

function newHistory(state:  GoalTracking, action:  Action):  GoalTracking {
    return Object.assign({}, state, {
        histories: histories(state.histories, action),
    });
}

export default function goalTracking(state: ?  GoalTracking, action:Action):  GoalTracking {
    if (state === undefined || state === null) {
        return {
            goals: goals(undefined, action),
            filter: filter(undefined, action),
            scheduler: scheduler(undefined, action),
            histories: histories(undefined, action),
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
        case ActionTypes.SET_HABIT_STATUS:
            return setHabitStatus(state,action);
        case ActionTypes.SET_CURRENT_TIME:
            return setCurrentTime(state, action);
        case ActionTypes.NEW_HISTORY:
            return newHistory(state, action);
        case ActionTypes.FILTER_GOAL_BY_STATUSES:
            let filtered: number[] = [];
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
                if (Object.keys(action.statuses).length === Object.keys(Status).length) {
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
