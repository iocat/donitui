// @flow
const React = require("react");
import DurationPicker from './DurationPicker';
import DateTimePicker from '../../../utils/DateTimePicker';
import type { Reminder } from '../../../../data/types';

const getStartDate = (reminder:Reminder):Date => {
    return reminder.remindAt;
}

type Props = {
    reminder: Reminder,
    onSet: (reminder:Reminder)=>void,
}

export default class ReminderCreator extends React.Component{
    props: Props;
    static defaultProps: {
        reminder: Reminder,
    }
    onStartDateTimeChange = (newDt: Date) => {
        let reminder: Reminder = Object.assign({}, this.props.reminder, {
            remindAt: newDt,
        })
        this.props.onSet(reminder);
    }
    // when the duration is changed
    onDurationChange = (duration: number)=>{
        let r = Object.assign({}, this.props.reminder,{
            duration:  duration,
        });
        this.props.onSet(r);
    }

    render(){
        let reminder: Reminder = this.props.reminder,
            startTimeChange = this.onStartDateTimeChange;

        return (
            <div>
                <DateTimePicker
                    dateTime={getStartDate(reminder)}
                    onChange={startTimeChange}
                    dateLabel="Start Date" timeLabel="Start Time"/>
                <DurationPicker
                    fullWidth={true}
                    onChange={this.onDurationChange}
                    duration={reminder.duration}/>
            </div>
        );
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
