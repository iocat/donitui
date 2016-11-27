// @flow
import type {
    $Scheduler,
    $Action,
    $ScheduledTaskEvent,
    $ActiveTask,
} from '../../data/reducers';

import type {
    Task,
    Goal,
    Reminder,
    RepeatedReminder
} from '../../data/types';

import {
    ActionTypes,
    ActionCreators,
} from '../../actions';

import {
    ReminderCycle,
    TaskStatus,
} from '../../data/index';
import ImmuHeap from './ImmuHeap';

const heapBuilder: ImmuHeap < $ScheduledTaskEvent > = new ImmuHeap(
    (ea: $ScheduledTaskEvent, eb: $ScheduledTaskEvent) => (ea.at < eb.at)
);

// returns at most two events for each task
function constructEvents(goalId: string, taskId: number, task: Task, evalAt: number): $ScheduledTaskEvent[] {
    let scheduledEvent = (startTime: number, duration: number): $ScheduledTaskEvent[] => {
        let es: $ScheduledTaskEvent[] = [],
            endTime: number = startTime + duration * 60000;
        if (startTime >= evalAt) {
            es.push({
                at: startTime,
                toStart: true,
                goalId: goalId,
                taskId: taskId,
                endTime: endTime,
            });
        }
        if (endTime >= evalAt) {
            es.push({
                at: endTime,
                toStart: false,
                goalId: goalId,
                taskId: taskId,
                endTime: endTime,
            })
        }
        return es;
    }
    if (task.reminder) {
        let reminder: Reminder = task.reminder,
            remindAt: number = reminder.remindAt.getTime();
        return scheduledEvent(remindAt, reminder.duration);
    } else if (task.repeatedReminder) {
        let rReminder: RepeatedReminder = task.repeatedReminder;
        if (rReminder.cycle === ReminderCycle.EVERY_DAY ||
            (rReminder.cycle === ReminderCycle.EVERY_WEEK &&
                rReminder.days[new Date(evalAt).getDay()] === true)) {
            let d: Date = new Date(evalAt);
            d.setHours(rReminder.remindAt.getHours());
            d.setMinutes(rReminder.remindAt.getMinutes());
            d.setMilliseconds(0);

            let remindAt: number = d.getTime();
            return scheduledEvent(remindAt, rReminder.duration);
        }
    }
    return [];
}

function receiveTask(state: $Scheduler, goal: Goal, taskId: number):$Scheduler{
    //  evaluate the task and push it to the event heap
    let task: Task = goal.tasks[taskId];
    if(task.status != null && task.status === TaskStatus.DONE){
        return state;
    }
    let activeTasks: $ActiveTask[] = state.activeTasks.slice(),
        eventHeap: $ScheduledTaskEvent[] = state.eventHeap,
        events: $ScheduledTaskEvent[] = constructEvents(goal.id, taskId, task, state.now);
    if (events.length === 0){
        // the task would not start at all (could be "done" or do not start today)
    }else if(events.length === 1){
        // the task is active
        activeTasks.push({goalId: goal.id, taskId: taskId, endTime: events[0].at });
        eventHeap = heapBuilder.push(eventHeap, events[0]);
    }else if (events.length === 2){
        // The task is not yet active
        eventHeap = heapBuilder.push(eventHeap, events[0]);
        eventHeap = heapBuilder.push(eventHeap, events[1]);
    }else{
        console.error("there cannot be more than 2 events for a task");
    }
    return Object.assign({}, state, {
        activeTasks: activeTasks,
        eventHeap: eventHeap,
    })
}


function setCurrentTime(state: $Scheduler, now: number):$Scheduler{
    // TODO: compare the time with the earliest event on heap and edit
    // the active task if necessary
    let eventHeap: $ScheduledTaskEvent[] = state.eventHeap;
    let activeTasks: $ActiveTask[] = state.activeTasks.slice();
    while (state.eventHeap.length > 0 && now >= eventHeap[0].at){
         let res = heapBuilder.pop(eventHeap);
         eventHeap = res.heap;
         let event: ?$ScheduledTaskEvent = res.item;
         if (event != null){
             if( event.toStart === true){
                 // add it to the active tasks
                 activeTasks.push({goalId: event.goalId, taskId: event.taskId, endTime: event.endTime});
             }else {
                 // remove from the active tasks
                 let i: number = 0;
                 while(i < activeTasks.length){
                     if(activeTasks[i].goalId === event.goalId && activeTasks[i].taskId === event.taskId){
                         activeTasks.splice(i,1);
                         break;
                     }
                     i++;
                 }
             }
         }
    }
    return Object.assign({}, state, {
        now: now,
        eventHeap: eventHeap,
        activeTasks: activeTasks,
    });
}

function loadGoal(state: $Scheduler, goal: Goal):$Scheduler{
    let newState: $Scheduler = Object.assign({}, state);
    goal.tasks.forEach((_: Task, taskId: number)=>{
        newState = scheduler(newState, ActionCreators.sched_RECEIVE_TASK(goal, taskId));
    })
    return newState;
}

export default function scheduler(state: ? $Scheduler, action : $Action): $Scheduler {
    if (state === undefined || state === null) {
        return {
            eventHeap: [],
            now: new Date().getTime(),
            activeTasks: [],
        }
    }
    switch (action.type) {
        // sets the global clock
        case ActionTypes.SET_CURRENT_TIME:
            return setCurrentTime(state, action.now);
        // receives a task and put it on schedule
        case ActionTypes.RECEIVE_TASK:
            return receiveTask(state, action.goal, action.taskId);
        // load the goal into the scheduler
        case ActionTypes.LOAD_GOAL:
        case ActionTypes.CREATE_GOAL:
            return loadGoal(state, action.goal);
        default:
            return state;
    }
}
