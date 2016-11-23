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
function evaluateTaskStatus(task: Task, now: Date):TaskStatusEnum{
    // Done task will never be evaluated at all
    if(task.status && task.status === TaskStatus.DONE){
        return TaskStatus.DONE;
    }
    let nowEpch: number = now.getTime(); // in ms
    if (task.reminder != null){
        let reminder: Reminder = task.reminder,
            taskStartEpch: number = reminder.remindAt.getTime(),
            taskEndEpch: number = taskStartEpch + (reminder.duration*1000);
        return toStatus(taskStartEpch, taskEndEpch, nowEpch);
    }else if (task.repeatedReminder != null) {
        let rReminder: RepeatedReminder = task.repeatedReminder;
        let cloneNow = new Date(now.getTime());
        // find start time and end time in day in Epoch
        cloneNow.setHours(rReminder.remindAt.getHours());
        cloneNow.setMinutes(rReminder.remindAt.getMinutes());
        cloneNow.setMilliseconds(0);
        let startTimeEpch = cloneNow.getTime(),
            endTimeEpch = startTimeEpch + rReminder.duration*1000;
        switch(rReminder.cycle) {
            case ReminderCycle.EVERY_DAY:
                return toStatus(startTimeEpch, endTimeEpch, nowEpch);
            case ReminderCycle.EVERY_WEEK:
                if(rReminder.cycle[now.getDay()] !== true){
                    return TaskStatus.NOT_DONE;
                }else{
                    return toStatus(startTimeEpch, endTimeEpch, nowEpch);
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
    case ActionTypes.LOAD_GOAL:
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
    switch (action.type) {
        case ActionTypes.EVALUATE_GOAL_STATUS:
            // TODO
            return [];
        case ActionTypes.LOAD_GOAL:
            let newTs: Task[] = state.slice(),
                i = 0;
            while(i < newTs.length){
                newTs[i] = task(newTs[i], action);
                i++;
            }
            return newTs;
        default:
            return state;
    }
}
