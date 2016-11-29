import {
    ActionTypes
} from '../../actions';
import {
    TaskStatus,
    ReminderCycle,
} from '../../data/index';
import type {
    Task,
    TaskStatusEnum
} from '../../data/types';

function toStatus(start: number, end: number, now: number): TaskStatusEnum{
    if (now < start){
        return TaskStatus.NOT_DONE;
    }else if (now < end) {
        return TaskStatus.IN_PROGRESS;
    }
    return TaskStatus.DONE;
}

// evaluateTaskStatus returns the status of the task with respect to the given
// time
function evaluateTaskStatus(task: Task, now: number):TaskStatusEnum{
    // Done task will never be evaluated at all
    if(task.status && task.status === TaskStatus.DONE){
        return TaskStatus.DONE;
    }
    if (task.reminder != null){
        let reminder: Reminder = task.reminder,
            taskStartEpch: number = reminder.remindAt.getTime(),
            taskEndEpch: number = taskStartEpch + reminder.duration*60000;
        return toStatus(taskStartEpch, taskEndEpch, now);
    }else if (task.repeatedReminder != null) {
        let rReminder: RepeatedReminder = task.repeatedReminder,
        cloneNow: Date = new Date(now),
        dayToday:number = cloneNow.getDay();
        // find start time and end time in day in Epoch
        cloneNow.setHours(rReminder.remindAt.getHours());
        cloneNow.setMinutes(rReminder.remindAt.getMinutes());
        cloneNow.setMilliseconds(0);
        let startTimeEpch = cloneNow.getTime(),
            endTimeEpch = startTimeEpch + rReminder.duration*60000;
        switch(rReminder.cycle) {
            case ReminderCycle.EVERY_DAY:
                return toStatus(startTimeEpch, endTimeEpch, now);
            case ReminderCycle.EVERY_WEEK:
                if(rReminder.cycle[dayToday] !== true){
                    return TaskStatus.NOT_DONE;
                }else{
                    return toStatus(startTimeEpch, endTimeEpch, now);
                }
            default:
                console.log("unhandled case");
        }
    }
    return TaskStatus.NOT_DONE;
}

function task(state: Task, action: any):Task{
    if(state === undefined) {
        return {
            name: "",
            description: "",
            status: TaskStatus.NOT_DONE,
            reminder: {
                remindAt: new Date(),
                duration: 0,
            }
        }
    }

    switch (action.type){
    case ActionTypes.SET_TASK_STATUS:
        return Object.assign({},state, {
            status: action.status,
        });
    case ActionTypes.LOAD_GOAL:
    case ActionTypes.CREATE_GOAL:
        return Object.assign({},state, {
            status: evaluateTaskStatus(state, action.now),
        })
    default:
        return state;
    }
}

// reducer that creates task data in terms of normalized key collection
export default function tasks(state: Task[], action: any): Task[] {
    if (state === undefined) {
        return [];
    }
    let newState: Task[] = state.slice();
    switch (action.type) {
        case ActionTypes.SET_TASK_STATUS:
            newState[action.taskId] = task(newState[action.taskId],action);
            return newState;
        case ActionTypes.LOAD_GOAL:
        case ActionTypes.CREATE_GOAL:
            let i = 0;
            while(i < newState.length){
                newState[i] = task(newState[i], action);
                i++;
            }
            return newState;
        default:
            return state;
    }
}
