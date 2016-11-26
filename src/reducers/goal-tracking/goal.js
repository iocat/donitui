// @flow
import {
    ActionTypes
} from '../../actions';
import {
    TaskStatus,
    GoalStatus,
    GoalVisibility,
} from '../../data/index';
import type {
    Goal,
    Task,
    GoalStatusEnum
} from '../../data/types';
import tasks from './tasks';

// goalStatusFromTasks induces the goal status from tasks
const goalStatusFromTasks = (tasks: Task[]): GoalStatusEnum => {
    if (tasks.length === 0) {
        return GoalStatus.NOT_DONE;
    }
    for (let task of tasks) {
        if (task.status === TaskStatus.IN_PROGRESS) {
            return GoalStatus.IN_PROGRESS;
        }
    }
    for (let task of tasks) {
        if (task.status === TaskStatus.NOT_DONE) {
            return GoalStatus.NOT_DONE;
        }
    }
    return GoalStatus.DONE;
}


export default function goal(state: Goal, action: any): Goal {
    if (state === undefined || state == null) {
        return {
            id: "",
            name: "",
            description: "",
            status: GoalStatus.NOT_DONE,
            img: "",
            visibility: GoalVisibility.PRIVATE,
            tasks: [],
        }
    }
    switch (action.type) {
        // evaluate if this goal is done or not based on the tasks
        case ActionTypes.EVALUATE_STATUS:
            let ts: Task[] = tasks(state.tasks, action);
            let status: GoalStatusEnum = goalStatusFromTasks(state.tasks);
            return Object.assign({}, state, {
                tasks: ts,
                status: status,
            });
        case ActionTypes.LOAD_GOAL:
            // evaluate tasks' statuses
            let reeval = tasks(state.tasks, action);
            return Object.assign({}, state, action.goal, {
                tasks: reeval,
                status: goalStatusFromTasks(reeval),
            });
        default:
            return state;

    }
}