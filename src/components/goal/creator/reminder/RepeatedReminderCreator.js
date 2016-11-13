// @flow
var React = require("react");
import {TimePicker, MenuItem, SelectField} from 'material-ui';
import DaysInWeek from './DaysInWeek';
import {ReminderCycle} from '../../../../data/index';
import type{HabitDays, RepeatedReminder} from '../../../../data/types';

export default class RepeatedReminderCreator extends React.Component{
    render(){
        let rReminder: RepeatedReminder = this.props.repeatedReminder;
        let onDaysChange = this.props.onDaysChange;
        let onCycleChange = this.props.onCycleChange;
        let daysPicker = null;
        switch(rReminder.cycle){
        case ReminderCycle.EVERY_WEEK:
            daysPicker = <DaysInWeek
                days={rReminder.days}
                addDay={(day: number)=>{
                        let days: HabitDays = Object.assign({}, rReminder.days);
                        days[day] = true;
                        onDaysChange(days);
                    }
                }
                rmDay={(day: number) => {
                        let days: HabitDays = Object.assign({}, rReminder.days);
                        delete days[day];
                        onDaysChange(days);
                    }
                }/>;
            break;
        default:
            daysPicker = null;
        }

        let divider :any = null;
        if (daysPicker) {
            divider = <br/>
        }
        return(
            <div>
                <SelectField floatingLabelText="Cycle"
                    value={rReminder.cycle}
                    onChange={onCycleChange}>
                    <MenuItem value={ReminderCycle.EVERY_DAY} primaryText="Every day"/>
                    <MenuItem value={ReminderCycle.EVERY_WEEK} primaryText="Every week"/>
                    {/* NOTE: not supported
                     <MenuItem value={ReminderCycle.EVERY_MONTH} primaryText="Every month"/> */}
                    </SelectField>
                {divider}
                {divider}
                {daysPicker}
                <div className="time-picker-group">
                    <TimePicker format="ampm" className="time-picker"
                        fullWidth={true}
                        floatingLabelText="Remind At" floatingLabelFixed={true}/>
                    <TimePicker format="24hr" className="time-picker"
                        fullWidth={true}
                        hintText="in hour:minute"
                        floatingLabelText="Duration" floatingLabelFixed={true} />
                    </div>
                </div>
        )
    }
}
