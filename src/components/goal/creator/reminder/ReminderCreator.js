// @flow
const React = require("react");
import DateTimePicker from '../../../utils/DateTimePicker';
import type { Reminder } from '../../../../data/types';

const getStartDate = (reminder:Reminder):Date => {
    return reminder.remindAt;
}

const getEndDate = (reminder:Reminder):Date=>{
    return new Date(reminder.remindAt.getTime() + (reminder.duration*1000));
}

type Props = {
    reminder: Reminder,
    onSet: (reminder:Reminder)=>void,
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
    props: Props;
    onStartDateTimeChange = (newDt: Date) => {
        let reminder: Reminder = Object.assign({}, this.props.reminder, {
            remindAt: newDt,
        })
        this.props.onSet(reminder);
    }
    onEndDateTimeChange = (newDt: Date) =>{
        let reminder = Object.assign({}, this.props.reminder, {
            duration: ((newDt.getTime() -
                    this.props.reminder.remindAt.getTime())/ 1000),
        })
        this.props.onSet(reminder);
    }

    render(){
        return renderReminder(this.props.reminder,
            this.onStartDateTimeChange, this.onEndDateTimeChange);
    }
}

ReminderCreator.defaultProps = {
    reminder: {
        remindAt: new Date(),
        duration: 0,
    },
}

ReminderCreator.propTypes = {
    reminder: React.PropTypes.object.isRequired,
    onSet: React.PropTypes.func.isRequired,
}
