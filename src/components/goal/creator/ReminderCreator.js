// @flow weak
const React = require("react");
import DateTimePicker from '../../utils/DateTimePicker';
import {SelectField, MenuItem} from 'material-ui';
import {ReminderCycle} from '../../../data/index';
import type {Reminder, RepeatedReminder,
    ReminderCycleEnum } from '../../../data/types';

const getEndDateLimitFunc = function(startDate:Date):(date: Date)=>boolean{
    if (startDate ){
        return function(date: Date): boolean{
            if (date.getFullYear() < startDate.getFullYear()) {
                return true
            }else if (date.getFullYear() === startDate.getFullYear()){
                if (date.getMonth() < startDate.getMonth()){
                    return true
                }else if (date.getMonth() === startDate.getMonth()){
                    return date.getDate() < startDate.getDate()
                }
            }
            return false;
        }
    }
    return (date:Date):boolean => false
}

const getStartDate = (reminder:Reminder):Date => {
    return reminder.remindAt;
}

const getEndDate = (reminder:Reminder):Date=>{
    return new Date(reminder.remindAt.getTime() + (reminder.duration*1000));
}

type Props = {
    repeated: boolean,
    reminder: Reminder,
    repeatedReminder: RepeatedReminder,
    onSetReminder: (reminder:Reminder)=>void,
    onSetRepeatedReminder: (rm: RepeatedReminder)=> void
}

const renderReminder = (reminder: Reminder,
    startTimeChange: (d: Date)=>void ,
    endTimeChange: (d:Date)=>void ) => {
    return (
        <div>
            <DateTimePicker
                dateTime={getStartDate(reminder)}
                onChange={startTimeChange}
                dateLabel="Start Date" timeLabel="Start Time"/>
            <DateTimePicker
                dateTime={getEndDate(reminder)}
                onChange={endTimeChange}
                dateLabel="End Date" timeLabel="End Time"/>
        </div>
    );
}

const renderRepeatedReminder = (rReminder: RepeatedReminder,
    changeCycle: (c: ReminderCycleEnum)=>void) => {
    return(
        <div>
            <SelectField floatingLabelText="Cycle"
                value={rReminder.cycle}
                onChange={changeCycle}>
                <MenuItem value={ReminderCycle.EVERY_DAY} primaryText="Every day"/>
                <MenuItem value={ReminderCycle.EVERY_WEEK} primaryText="Every week"/>
                <MenuItem value={ReminderCycle.EVERY_MONTH} primaryText="Every month"/>
            </SelectField>
        </div>
    )
}

export default class ReminderCreator extends React.Component{
    static defaultProps: {
        repeated: boolean,
    };
    props: Props;
    onStartDateTimeChange = (newDt: Date) => {
        let reminder: Reminder = Object.assign({}, this.props.reminder, {
            remindAt: newDt,
        })
        this.props.onSetReminder(reminder);
    }
    onEndDateTimeChange = (newDt: Date) =>{
        let reminder = Object.assign({}, this.props.reminder, {
            duration: ((newDt.getTime() -
                    this.props.reminder.remindAt.getTime())/ 1000),
        })
        this.props.onSetReminder(reminder);
    }

    onCycleChange = (event:Object,k:number , cycle: ReminderCycleEnum) =>{
        let rr = Object.assign({}, this.props.repeatedReminder, {
            cycle: cycle,
        });
        this.props.onSetRepeatedReminder(rr);
    }

    render(){
        if (!this.props.repeated){
            return renderReminder(this.props.reminder,
                this.onStartDateTimeChange, this.onEndDateTimeChange);
        }
        return renderRepeatedReminder(this.props.repeatedReminder, this.onCycleChange );
    }
}

ReminderCreator.defaultProps = {
    repeated: false,
    reminder: {
        remindAt: new Date(),
        duration: 0,
    },
    repeatedReminder:{
        cycle: "EVERY_DAY",
        remindAt: new Date(),
        days: {},
        duration: 0,
    },
}
