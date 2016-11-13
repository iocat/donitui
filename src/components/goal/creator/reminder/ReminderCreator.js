// @flow weak
const React = require("react");
import DateTimePicker from '../../../utils/DateTimePicker';
import RepeatedReminderCreator from './RepeatedReminderCreator';
import type { Reminder, RepeatedReminder, ReminderCycleEnum, HabitDays} from '../../../../data/types';

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

    onCycleChange = (event:Object, k:number , cycle: ReminderCycleEnum) =>{
        let rr = Object.assign({}, this.props.repeatedReminder, {
            cycle: cycle,
        });
        this.props.onSetRepeatedReminder(rr);
    }

    onDaysChange = (days: HabitDays) => {
        let rr = Object.assign({}, this.props.repeatedReminder, {
            days: days,
        })
        this.props.onSetRepeatedReminder(rr);
    }
    render(){
        if (!this.props.repeated){
            return renderReminder(this.props.reminder,
                this.onStartDateTimeChange, this.onEndDateTimeChange);
        }
        return <RepeatedReminderCreator
            repeatedReminder={this.props.repeatedReminder}
            onCycleChange={this.onCycleChange}
            onDaysChange={this.onDaysChange}/>;
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
