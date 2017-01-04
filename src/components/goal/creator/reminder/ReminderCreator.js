// @flow
const React = require("react");
import DurationPicker from './DurationPicker';
import DateTimePicker from '../../../utils/DateTimePicker';
export type Reminder = {
    remindAt: Date,
    duration: number
}

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
                    dateLabel="On" timeLabel="At"/>
                <div className="col-2">
                    <div className="left">
                        <DurationPicker onChange={this.onDurationChange}
                            duration={reminder.duration}/>
                        </div>
                    <div className="right"/> </div>
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
