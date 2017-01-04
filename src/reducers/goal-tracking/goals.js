// @flow
import {ActionTypes} from '../../actions';
import { Status, Visibility } from '../../data/index';
import type { Goal, Task, Habit, StatusEnum} from '../../data/types';
import {tasks} from './tasks';
import {habits} from './habits';

// reducer that creates goal data in terms of normalized keys collection
export function goals(state: ?{[id: number]: Goal}, action : any): {[id: number]: Goal} {
    if (state === undefined || state === null) {
        return {};
    }
    let gs = Object.assign({}, state);
    switch (action.type) {
        case ActionTypes.DELETE_GOAL:
            delete gs[action.goalId];
            return gs;
        case ActionTypes.SET_TASK_STATUS:
            gs[action.goalId] = goal(gs[action.goalId], action);
            return gs;
        // load the goal and categorize its current status
        case ActionTypes.CREATE_GOAL:
        case ActionTypes.LOAD_GOAL:
            gs[action.goal.id] = goal(action.goal, action);
            return gs;
        default:
            return state;
    }
}

// goalStatusFromTasks induces the goal status from tasks
const statusFrom = (tasks: Task[], habits: Habit[]): StatusEnum => {
    let ths: (Task | Habit)[] = tasks.concat(habits);
    if (ths.length === 0) {
        return Status.INACTIVE;
    }
    for (let th of ths) {
        if (th.status === Status.ACTIVE) {
            return Status.ACTIVE;
        }
    }
    for (let th of ths) {
        if (th.status === Status.INACTIVE) {
            return Status.INACTIVE;
        }
    }
    return Status.DONE;
}


export function goal(state: ?Goal, action: any): Goal {
    if (state === undefined || state == null) {
        return {
            id: 0,
            name: "",
            description: "",
            status: Status.INACTIVE,
            img: "",
            visibility: Visibility.PRIVATE,
            tasks: [],
            habits: [],
        }
    }
    let newTasks = tasks(state.tasks, action),
        newHabits = habits(state.habits, action);

    switch (action.type) {
        case ActionTypes.SET_TASK_STATUS:
            return Object.assign({}, state, {
                tasks: newTasks,
                habits: newHabits,
                status: statusFrom(newTasks, newHabits),
            });
        case ActionTypes.LOAD_GOAL:
        case ActionTypes.CREATE_GOAL:
            return Object.assign({}, state, action.goal, {
                tasks: newTasks,
                habits: newHabits,
                status: statusFrom(newTasks, newHabits),
            });
        default:
            return state;
    }
}
