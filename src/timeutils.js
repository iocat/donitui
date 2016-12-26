// @flow
// contains utitility functions that deal with time
import moment from 'moment';

// converts from hh:mm to minutes
export const timeToDuration = (time: Date):number =>{
    return time.getHours()*60 + time.getMinutes();
}
// converts from minutes to date type
export const durationToDate = (duration: number ):?Date =>{
    if (duration === 0){
        return null;
    }
    let time: Date = new Date();
    time.setHours(Math.floor(duration/60), duration%60)
    return time
}

const thisYear = (new Date()).getFullYear();

// formats date such that the current year does not show up
export const formatDate = (date: Date):string => {
    if (date.getFullYear() === thisYear){
        return moment(date).format("dddd, MM/DD");
    }else{
        return moment(date).format("dddd, MM/DD/YYYY");
    }
}
// formats the time using the given date
export const formatTime = (date: Date): string => {
    return moment(date).format("LT");
}

export const formatDateAndTime = (date: Date): string =>{
    let fmt: string = moment(date).calendar();
    return fmt.charAt(0).toLowerCase() + fmt.slice(1);
}

export const formatDuration = (duration: number): string=>{
    return duration + " minutes";
}

// converts a duration in ms to a readable time from now
export const readableDuration = (duration: number):string =>{
    if (0 < duration && duration < 1000){
        return Math.floor(duration/1000) + " second";
    }else if (duration < 60000) {
        return Math.floor(duration/1000)+ " seconds";
    }
    return moment.duration(duration).humanize();
}

import type { StatusEnum, Task, Habit} from './data/types';
import { Status } from './data/index';

// returns the task status according to the current time
export const getTaskStatus = (task: Task, now: number):StatusEnum =>{
    if (task.status === Status.DONE){
        return Status.DONE;
    }
    let timing = taskTiming(task),
        [start,end] = timing;
    if (now < start){
        return Status.INACTIVE;
    }
    if(now < end){
        return Status.ACTIVE;
    }
    return Status.DONE;
}

export const taskTiming = (task: Task):[number,number] =>{
    let start: number = task.remindAt.getTime(),
        end: number = start + task.duration*1000;
    return [start,end]
}

// returns the habit status according to the current time
// return the same status if the status is done
// TODO: the status is limited to the scope of the current day?
export const getHabitStatus = (habit: Habit, now: number):StatusEnum => {
    if (habit.status === Status.DONE){
        return Status.DONE;
    }
    let timing = habitTiming(habit, now);
    if (timing == null) {
        return Status.INACTIVE;
    }
    let [start, end] = timing;
    if (now < start || now > end){
        return Status.INACTIVE;
    }
    return Status.ACTIVE;
}

// get the habit timing for today
// returns null if this habit does not start today
export const habitTiming = (habit: Habit, now: number): ?[number, number] =>{
    let nowDate: Date = new Date(now),
        nowDay: number = nowDate.getDay();
    // inactive for habits not to do today
    if (habit.days[nowDay] !== true){
        return null;
    }
    // set to start of now (today)
    nowDate.setHours(0,0,0,0);
    let start: number = nowDate.getTime() + habit.offset * 1000,
        end: number = start + habit.duration * 1000;
    return [start,end]
}
