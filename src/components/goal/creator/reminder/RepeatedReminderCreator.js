// @flow
var React = require("react");
import DurationPicker from './DurationPicker';
import {TimePicker, MenuItem, SelectField} from 'material-ui';
import DaysInWeek from './DaysInWeek';
import {ReminderCycle} from '../../../../data/index';
import type{HabitDays, RepeatedReminder, ReminderCycleEnum} from '../../../../data/types';

export default class RepeatedReminderCreator extends React.Component{
    onCycleChange = (event:Object, k:number , cycle: ReminderCycleEnum) =>{
        let rr = Object.assign({}, this.props.repeatedReminder, {
            cycle: cycle,
        });
        this.props.onSet(rr);
    }

    onDaysChange = (days: HabitDays) => {
        let rr = Object.assign({}, this.props.repeatedReminder, {
            days: days,
        })
        this.props.onSet(rr);
    }

    // when the timer is changed
    onTimeChange = (_:Event, date:Date) =>{
        let rr = Object.assign({}, this.props.repeatedReminder, {
            remindAt: date,
        })
        this.props.onSet(rr);
    }

    // when the duration is changed
    onDurationChange = (duration:number)=>{
        let rr = Object.assign({}, this.props.repeatedReminder,{
            duration:   duration,
        });
        this.props.onSet(rr);
    }

    render(){
        let rReminder: RepeatedReminder = this.props.repeatedReminder;
        let daysPicker = null;
        switch(rReminder.cycle){
        case ReminderCycle.EVERY_WEEK:
            daysPicker = <DaysInWeek
                days={rReminder.days}
                addDay={(day: number)=>{
                        let days: HabitDays = Object.assign({}, rReminder.days);
                        days[day] = true;
                        this.onDaysChange(days);
                    }
                }
                rmDay={(day: number) => {
                        let days: HabitDays = Object.assign({}, rReminder.days);
                        delete days[day];
                        this.onDaysChange(days);
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
                    onChange={this.onCycleChange}>
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
                        value={rReminder.remindAt} autoOk={true}
                        fullWidth={true} onChange={this.onTimeChange}
                        floatingLabelText="Remind At" floatingLabelFixed={true}/>
                    <DurationPicker className="time-picker"
                        onChange={this.onDurationChange}
                        duration={rReminder.duration}/>
                    </div>
                </div>
        )
    }
    static defaultProps: {
        repeatedReminder: RepeatedReminder,
    }
}

RepeatedReminderCreator.defaultProps = {
    repeatedReminder: {
        cycle: ReminderCycle.EVERY_DAY,
        days: {},
        duration: 0,
        remindAt: new Date(),
    }
}

RepeatedReminderCreator.propTypes = {
    repeatedReminder: React.PropTypes.object.isRequired,
    onSet: React.PropTypes.func.isRequired,
}
