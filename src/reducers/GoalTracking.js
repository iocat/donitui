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

function loadGoals(state: $GoalTracking, action: $Action): $GoalTracking {
    let gs: Goal[] = action.goals,
        done = state.done.slice(),
        notDone = state.notDone.slice(),
        inProgress = state.inProgress.slice(),
        gids = state.gids.slice(),
        newGSet = Object.assign({}, state.goals);
    for (let goal of gs) {
        // load individual goal
        newGSet = goals(newGSet, ActionCreators.LOAD_GOAL(goal, action.now));
        pushToCorrespondingGids(newGSet[goal.id], gids, done, notDone, inProgress);
    }
    return Object.assign({}, state, {
        gids: gids,
        done: done,
        notDone: notDone,
        inProgress: inProgress,
        goals: newGSet,
    });
}


function loadGoal(state: $GoalTracking, action: $Action): $GoalTracking {
    let newGSet: {
            [id: string]: Goal
        } = goals(state.goals, action),
        done = state.done.slice(),
        notDone = state.notDone.slice(),
        inProgress = state.inProgress.slice(),
        gids = state.gids.slice();
    pushToCorrespondingGids(newGSet[action.goal.id], gids, done, notDone, inProgress);
    return Object.assign({}, state, {
        gids: gids,
        done: done,
        notDone: notDone,
        inProgress: inProgress,
        goals: newGSet,
    });
}

function deleteGoal(state: $GoalTracking, action: $Action ): $GoalTracking {
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
    });
    // refilter goals
    return goalTracking(editedGT, ActionCreators.FILTER_GOAL_BY_STATUSES(editedGT.filter.byStatuses));

}

export default function goalTracking(state: $GoalTracking, action: $Action): $GoalTracking {
    if (state === undefined) {
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
        case ActionTypes.LOAD_GOAL:
            return loadGoal(state, action);
        case ActionTypes.DELETE_GOAL:
            return deleteGoal(state, action);
        case ActionTypes.FILTER_GOAL_BY_STATUSES:
            let filtered: string[] = [];
            switch (action.statuses) {
                // cached filter
                case StatusFilter.ALL:
                    filtered = state.gids;
                    break;
                case StatusFilter.DONE:
                    filtered = state.done;
                    break;
                case StatusFilter.NOT_DONE:
                    filtered = state.notDone;
                    break;
                case StatusFilter.IN_PROGRESS:
                    filtered = state.inProgress;
                    break;
                default:
                    // manually filter
                    let keys = state.gids;
                    if (Object.keys(action.statuses).length === Object.keys(GoalStatus).length) {
                        filtered = keys;
                    } else {
                        keys.forEach(function(key) {
                            if (action.statuses[state.goals[key].status] === true) { // goal's status' matches the filter
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
