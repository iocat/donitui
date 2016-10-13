import {ActionTypes} from '../../actions/index';
import {GoalStatus,GoalVisibility} from '../../actions/goals';
import {TaskStatus} from '../../actions/tasks';
import tasks from './tasks';

const initGoalData = {
    id: "",
    name: "",
    description: "",
    lastUpdated: null,
    status: GoalStatus.NOT_DONE,
    pictureUrl: "",
    visibility: GoalVisibility.PRIVATE,
    tasks: {},
}

// goalStatusFromTasks induces the goal status from tasks
function goalStatusFromTasks(tasks){
    let keys = Object.keys(tasks);
    if (keys.length === 0){
        return GoalStatus.NOT_DONE;
    }
    for (let k of keys){
        if (tasks[k].status === TaskStatus.IN_PROGRESS){
            return GoalStatus.IN_PROGRESS;
        }
    }
    for (let k of keys){
        if (tasks[k].status === TaskStatus.NOT_DONE){
            return GoalStatus.NOT_DONE;
        }
    }
    return GoalStatus.DONE;
}

function goal(state , action) {
    if (state === undefined) {
        return initGoalData;
    }
    let g = null;
    switch (action.type) {
        case ActionTypes.SET_GOAL_VISIBILITY:
            return Object.assign({}, state, {
                visibility: action.visibility,
            })

        case ActionTypes.CREATE_GOAL_WITH_ID:
            return Object.assign({}, action.goal, {
                status: goalStatusFromTasks(action.goal.tasks),
            });

        case ActionTypes.SET_GOAL_STATUS_MANUALLY:
            return Object.assign({}, state, {
                status: action.status,
            })

        case ActionTypes.CREATE_TASK_WITH_ID:
        case ActionTypes.DELETE_TASK:
        case ActionTypes.SET_TASK_STATUS:
            g = Object.assign({}, state, {
                tasks: tasks(state.tasks, action),
            });
            g.status = goalStatusFromTasks(g.tasks);
            return g;

        default:
            return state;
    }
}


// reducer that creates goal data in terms of normalized keys collection
export default function goals(state = {}, action) {
    if (state === undefined) {
        return {}
    }
    let gs = null;
    switch (action.type) {
        case ActionTypes.DELETE_GOAL:
            gs = Object.assign({}, state);
            delete gs[action.id];
            return gs;

        case ActionTypes.CREATE_GOAL_WITH_ID:
            gs = Object.assign({}, state);
            gs[action.id] = goal({}, action);
            return gs;

        case ActionTypes.SET_GOAL_VISIBILITY:
            gs = Object.assign({}, state);
            gs[action.id] = goal(gs[action.id], action);
            return gs;

        case ActionTypes.CREATE_TASK_WITH_ID:       // propagate the action
        case ActionTypes.DELETE_TASK:               // to the tasks
        case ActionTypes.SET_TASK_STATUS:
            gs = Object.assign({}, state);
            gs[action.goalid] = goal(gs[action.goalid], action);
            return gs;
        default:
            return state;
    }
}
