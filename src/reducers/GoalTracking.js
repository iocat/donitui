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
import type {
    $GoalTracking
} from '../data/reducers';
import type {
    Goal
} from '../data/types';



function pushToCorrespondingGids(goal: Goal,
    gids: string[], done: string[],
    notDone: string[], inProgress: string[]){
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

function loadGoals(state: $GoalTracking, action: any): $GoalTracking{
    let gs: Goal[] = action.goals,
        done = state.Done.slice(),
        notDone = state.NotDone.slice(),
        inProgress = state.InProgress.slice(),
        gids = state.Gids.slice(),
        newGSet = Object.assign({}, state.Goals);
    for (let goal of gs){
        // load individual goal
        newGSet = goals(newGSet, ActionCreators.LOAD_GOAL(goal, action.now));
        pushToCorrespondingGids(newGSet[goal.id], gids,done,notDone, inProgress);
    }
    return Object.assign({}, state, {
        Gids: gids,
        Done: done,
        NotDone: notDone,
        InProgress: inProgress,
        Goals: newGSet,
    });
}


function loadGoal(state: $GoalTracking, action: any): $GoalTracking{
    let newGSet: {[id:string]:Goal} = goals(state.Goals, action),
        done = state.Done.slice(),
        notDone = state.NotDone.slice(),
        inProgress = state.InProgress.slice(),
        gids = state.Gids.slice();
    pushToCorrespondingGids(newGSet[action.goal.id], gids, done, notDone, inProgress);
    return Object.assign({}, state, {
        Gids: gids,
        Done: done,
        NotDone: notDone,
        InProgress: inProgress,
        Goals: newGSet,
    });
}

export default function GoalTracking(state: $GoalTracking, action: any): $GoalTracking {
    if (state === undefined) {
        return {
            Goals: goals(undefined, action),
            Filter: filter(undefined, action),
            Gids: [],
            Done: [],
            NotDone: [],
            InProgress: [],
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
            // TODO edit this
            return Object.assign({}, state, {
                Goals: goals(state.Goals, action),
            });
        case ActionTypes.FILTER_GOAL_BY_STATUSES:
            let filtered: string[] = [];
            switch (action.statuses) {
                // cached filter
                case StatusFilter.ALL:
                    filtered = state.Gids;
                    break;
                case StatusFilter.DONE:
                    filtered = state.Done;
                    break;
                case StatusFilter.NOT_DONE:
                    filtered = state.NotDone;
                    break;
                case StatusFilter.IN_PROGRESS:
                    filtered = state.InProgress;
                    break;
                default:
                    // manually filter
                    let keys = state.Gids;
                    if (Object.keys(action.statuses).length === Object.keys(GoalStatus).length) {
                        filtered = keys;
                    } else {
                        keys.forEach(function(key) {
                            if (action.statuses[state.Goals[key].status] === true) { // goal's status' matches the filter
                                filtered.push(key);
                            }
                        })
                    }
            }
            let newFilter = Object.assign({}, filter(state.Filter, action), {
                gids: filtered
            });
            return Object.assign({}, state, {
                Filter: newFilter
            });
        default:
            return state;
    }
}
