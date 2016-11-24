// @flow
import type {
    $Action,
    $ScheduledTaskEvent
} from '../../data/reducers';
import {
    TaskStatus,
    ReminderCycle,
} from '../../data/index';
import type {
    Goal,
    Task,
    Reminder,
    RepeatedReminder
} from '../../data/types';
import {
    ActionTypes
} from '../../actions';
import ImmuHeap from './ImmuHeap';

const heapBuilder: ImmuHeap < $ScheduledTaskEvent > = new ImmuHeap(
    (ea: $ScheduledTaskEvent, eb: $ScheduledTaskEvent) => (ea.at < eb.at)
);

// returns at most two events for each task
function constructEvents(gid: string, taskid: number, task: Task, evalAt: number): $ScheduledTaskEvent[] {
    let scheduledEvent = (startTime: number, duration: number): $ScheduledTaskEvent[] => {
        let es: $ScheduledTaskEvent[] = [],
            endTime: number = startTime + duration * 60000;
        if (startTime >= evalAt) {
            es.push({
                at: startTime,
                toStart: true,
                goalIndex: gid,
                taskIndex: taskid,
            });
        }
        if (endTime >= evalAt) {
            es.push({
                at: endTime,
                toStart: false,
                goalIndex: gid,
                taskIndex: taskid,
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

function preprocessScheduler(state: $ScheduledTaskEvent[], action: $Action): $ScheduledTaskEvent[] {
    let eves: $ScheduledTaskEvent[] = [];
    let gids: string[] = action.inProgress.slice().concat(action.notDone.slice());
    for (let gid: string of gids) {
        let goal: Goal = action.goals[gid];
        for (let [tid: number, task: Task] of goal.tasks.entries()) {
            if (task.status === TaskStatus.DONE) {
                continue;
            }
            let es: $ScheduledTaskEvent[] = constructEvents(gid, tid, task, action.preprocessTime);
            for (let eve: $ScheduledTaskEvent of es) {
                eves = heapBuilder.push(eves, eve);
            }
        }
    }
    return eves;
}

// immutable event heap
export default function eventHeap(state: ? $ScheduledTaskEvent[], action : $Action): $ScheduledTaskEvent[] {
    if (state === undefined || state === null) {
        return [];
    }
    switch (action.type) {
        case ActionTypes.PREPROCESS_SCHEDULER:
            return preprocessScheduler(state, action);
        default:
            return state;
    }
}
