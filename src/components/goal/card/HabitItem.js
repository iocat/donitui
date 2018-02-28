// @flow
import React from 'react';

import { ListItem } from 'material-ui';
import type { Habit, HabitDays } from '../../../data/types';
import {formatTime, readableDuration} from '../../../timeutils';
import StatusNode from '../StatusNode';

//const mapNumberToDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class HabitItem extends React.Component{
    static defaultProps: {
        insetChildren: boolean,
    }

    getHabitName = ():string => {
        let habit: Habit = this.props.habit;
        return habit.name ;
    }

    getDescription = () =>{
        let habit: Habit = this.props.habit,
            days: HabitDays = habit.days,
            count = 0,
            t = (new Date());

        t.setHours(0,0,0,0);
        t = new Date(t.getTime() + habit.offset * 1000);

        for ( let i = 0; i < 7; i ++){
            if (days[i.toString()] === true){
                count ++
            }
        }
        if (count === 7) {
            return <div>
                For {readableDuration(habit.duration*1000)}, daily at {formatTime(t)}
            </div>
        }
        return <div>
            For {readableDuration(habit.duration*1000)}, weekly at {formatTime(t)}
        </div>

    }

    render(){
        let habit: Habit = this.props.habit;
        return <ListItem
            onTouchTap={this.props.onTouchTap}
            rightIconButton={<StatusNode status={habit.status}/>} leftIcon={this.props.leftIcon}
            insetChildren={this.props.insetChildren} primaryText={this.getHabitName()}
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
