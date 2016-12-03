// @flow
import React from 'react';

import { ListItem } from 'material-ui';
import type {Task, RepeatedReminder} from '../../../data/types';
import {ReminderCycle} from '../../../data/index';
import {formatTime, readableDuration} from '../../../timeutils';
import StatusNode from '../StatusNode';

const mapNumberToDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class HabitItem extends React.Component{
    static defaultProps: {
        insetChildren: boolean,
    }

    getHabitName = ():string => {
        let habit: Task = this.props.habit;
        return habit.name ;
    }

    getDescription = () =>{
        let reminder: ?RepeatedReminder = this.props.habit.repeatedReminder;
        let cycleString: string = "";
        if (reminder != null){
            switch (reminder.cycle){
                case ReminderCycle.EVERY_DAY:
                    cycleString = "daily";
                    return <div>
                        For {readableDuration(reminder.duration*60000)}, {cycleString} at {formatTime(reminder.remindAt)}
                    </div>
                case ReminderCycle.EVERY_WEEK:
                    cycleString = "weekly";
                    let days: string[]= [];
                    let habitDays: any= reminder.days;
                    if (habitDays != null){
                        Object.keys(habitDays).forEach((key: number)=>{
                            if (habitDays[key] === true){
                                days.push(mapNumberToDay[key]);
                            }
                        })
                    }
                    return <div>
                        For {readableDuration(reminder.duration*60000)}, {cycleString} at {formatTime(reminder.remindAt)}
                    </div>
                default:
                    console.error("unexpected: description not returned in HabitItem");
            }
        }
        return "";
    }

    render(){
        let habit: Task = this.props.habit;
        return <ListItem
            onTouchTap={this.props.onTouchTap}
            rightIconButton={<StatusNode status={habit.status}/>} leftIcon={this.props.leftIcon}
            insetChildren={this.props.insetChildren}
            primaryText={this.getHabitName()}
            secondaryText={this.getDescription()}/>
    }
}


HabitItem.defaultProps ={
    leftIcon: null,
    insetChildren: false,
}

HabitItem.propTypes = {
    onTouchTap: React.PropTypes.func,
    leftIcon: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
    habit: React.PropTypes.object.isRequired,
}
