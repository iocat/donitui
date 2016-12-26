// @flow
import type { Scheduler, Action, Event, ActiveTask} from '../../data/reducers';
import type {Task, Goal, Habit} from '../../data/types';
import { ActionTypes, ActionCreators } from '../../actions';
import { Status } from '../../data/index';
import ImmuHeap from './ImmuHeap';
import {taskTiming, habitTiming} from '../../timeutils';

const heapBuilder: ImmuHeap < Event > = new ImmuHeap(
    (ea: Event, eb: Event) => (ea.at < eb.at)
);

// returns 2 events for each task
function constructTaskEvents(goalId: number, taskId: number, task: Task): Event[] {
    let [startTime, endTime] = taskTiming(task);
    return [{
        at: startTime,
        nextStatus: Status.ACTIVE,
        goalId: goalId,
        isHabit: false,
        id: taskId,
        endTime: endTime,
    }, {
        at: endTime,
        nextStatus: Status.DONE,
        goalId: goalId,
        isHabit: false,
        id: taskId,
        endTime: endTime,
    }];
}

// construct the events for this habit
// TODO: current limit is one day (the start of the day now occurs)
function constructHabitEvents(goalId: number, habitId: number, habit: Habit, now: number): Event[] {
    let timing: ?[number, number] = habitTiming(habit, now),
        events: Event[] = [];
    if (timing == null){
        return events;
    }
    let [startTime, endTime] = timing;
    events.push({
        at: startTime,
        nextStatus: Status.ACTIVE,
        goalId: goalId,
        isHabit: true,
        id: habitId,
        endTime: endTime
    })
    events.push({
        at:startTime,
        nextStatus: Status.INACTIVE,
        goalId: goalId,
        isHabit: true,
        id: habitId,
        endTime: endTime
    })
    return events;
}

function receiveTask(state: Scheduler, goal: Goal, taskId: number): Scheduler {
    let task: Task = goal.tasks[taskId];
    if (task.status != null && task.status === Status.DONE) {
        return state;
    }
    let events: Event[] = constructTaskEvents(goal.id, taskId, task);
    return Object.assign({}, state, {
        eventHeap: heapBuilder.pushMany(state.eventHeap, events),
    })
}

function receiveHabit(state: Scheduler, goal: Goal, habitId: number): Scheduler{
    //  evaluate the task and push it to the event heap
    let habit: Habit = goal.habits[habitId];
    if (habit.status != null && habit.status === Status.DONE) {
        return state;
    }
    let events: Event[] = constructHabitEvents(goal.id, habitId, habit, state.now);
    return Object.assign({}, state, {
        eventHeap: heapBuilder.pushMany(state.eventHeap, events),
    })
}


function setCurrentTime(state:  Scheduler, now: number):  Scheduler {
    let eventHeap:  Event[] = state.eventHeap,
        active:  ActiveTask[] = state.activeTasks.slice(),
        statusChange: Event[] = state.statusChange.slice();
    while (eventHeap.length > 0 && now >= heapBuilder.peek(eventHeap).at) {
        let res = heapBuilder.pop(eventHeap),
            event:  Event = res.item;
        eventHeap = res.heap;
        statusChange.push(event);
        switch(event.nextStatus){
        case Status.ACTIVE:
            active.push({
                goalId: event.goalId,
                isHabit: event.isHabit,
                id: event.id,
                endTime: event.endTime
            });
            break;
        default:
            let i: number = 0;
            while (i < active.length) {
                if (active[i].goalId === event.goalId && (active[i].isHabit === event.isHabit)  && active[i].id === event.id) {
                    active.splice(i, 1);
                    break;
                }
                i++;
            }
        }
    }
    return Object.assign({}, state, {
        now: now,
        eventHeap: eventHeap,
        activeTasks: active,
        statusChange: statusChange,
    });
}

function loadGoal(state:  Scheduler, goal: Goal):  Scheduler {
    let newState:  Scheduler = Object.assign({}, state);
    goal.tasks.forEach((_: Task, taskId: number) => {
        newState = scheduler(newState, ActionCreators.sched_RECEIVE_TASK(goal, taskId));
    });
    goal.habits.forEach((_:Habit, habitId: number) => {
        newState = scheduler(newState, ActionCreators.sched_RECEIVE_HABIT(goal,habitId));
    });
    return newState;
}

function deleteGoal(state:  Scheduler, goalId: string):  Scheduler {
    let activeTasks:  ActiveTask[] = state.activeTasks.filter((task:  ActiveTask): boolean => (task.goalId !== goalId)),
        eventHeap:  Event[] = state.eventHeap.filter( (event: Event): boolean=>(event.goalId !== goalId));
    return Object.assign({}, state, {
        activeTasks: activeTasks,
        // rebuild the heap
        eventHeap: heapBuilder.init(eventHeap),
    });
}

export default function scheduler(state:?Scheduler, action:Action):Scheduler {
    if (state === undefined || state === null) {
        return {
            eventHeap: [],
            now: new Date().getTime(),
            activeTasks: [],
            statusChange: [],
        }
    }
    switch (action.type) {
        // sets the global clock
        case ActionTypes.SET_CURRENT_TIME:
            return setCurrentTime(state, action.now);
            // receives a task and put it on schedule
        case ActionTypes.RECEIVE_TASK:
            return receiveTask(state, action.goal, action.taskId);
        case ActionTypes.RECEIVE_HABIT:
            return receiveHabit(state, action.goal, action.habitId);
            // load the goal into the scheduler
        case ActionTypes.LOAD_GOAL:
        case ActionTypes.CREATE_GOAL:
            return loadGoal(state, action.goal);
        case ActionTypes.DELETE_GOAL:
            return deleteGoal(state, action.id);
        default:
            return state;
    }
}
