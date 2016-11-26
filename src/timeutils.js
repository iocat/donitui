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
    return moment(date).calendar();
}

export const formatDuration = (duration: number): string=>{
    return duration + " minutes";
}

// converts a duration in ms to a readable time from now
export const readableDuration = (duration: number):string =>{
    return moment.duration(duration).humanize();
}
