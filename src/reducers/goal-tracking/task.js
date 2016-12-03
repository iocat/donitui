// @flow
import {
    ActionTypes
} from '../../actions';
import {
    TaskStatus,
    ReminderCycle,
} from '../../data/index';
import type {
    Task,
    TaskStatusEnum,
    Reminder,
    RepeatedReminder
} from '../../data/types';


function taskToStatus(start: number, end: number, now: number): TaskStatusEnum{
    if (now < start){
        return TaskStatus.NOT_DONE;
    }
    if ( now < end){
        return TaskStatus.IN_PROGRESS;
    }
    return TaskStatus.DONE;
}

function habitToStatus(start: number, end: number, now: number): TaskStatusEnum{
    if ( start <= now && now <= end){
        return TaskStatus.IN_PROGRESS;
    }
    return TaskStatus.NOT_DONE;
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
        return taskToStatus(taskStartEpch, taskEndEpch, now);
    }else if (task.repeatedReminder != null) {
        let rReminder: RepeatedReminder = task.repeatedReminder,
        cloneNow: Date = new Date(now),
        dayToday:number = cloneNow.getDay();
        // find start time and end time in day in Epoch
        cloneNow.setHours(rReminder.remindAt.getHours());
        cloneNow.setMinutes(rReminder.remindAt.getMinutes());
        cloneNow.setSeconds(rReminder.remindAt.getSeconds()) ;
        let startTimeEpch = cloneNow.getTime(),
            endTimeEpch = startTimeEpch + rReminder.duration*60000;
        switch(rReminder.cycle) {
            case ReminderCycle.EVERY_DAY:
                return habitToStatus(startTimeEpch, endTimeEpch, now);
            case ReminderCycle.EVERY_WEEK:
                if(rReminder.days[dayToday] !== true){
                    return TaskStatus.NOT_DONE;
                }else{
                    return habitToStatus(startTimeEpch, endTimeEpch, now);
                }
            default:
                console.log("unhandled case");
        }
    }
    return TaskStatus.NOT_DONE;
}

export default function task(state: Task, action: any):Task{
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
