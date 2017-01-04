// @flow
var React = require("react");
import DurationPicker from './DurationPicker';
import {TimePicker} from 'material-ui';
import DaysInWeek from './DaysInWeek';
import {} from '../../../../data/index';
import type{ HabitDays } from '../../../../data/types';

export type RepeatedReminder = {
    days: HabitDays,
    remindAt: Date,
    duration: number,
}

export default class RepeatedReminderCreator extends React.Component{
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
        return(
            <div>
                On
                <br/>
                <DaysInWeek
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
                    }}/>
                <br/>
                <div className="col-2">
                    <div className="left">
                        <TimePicker format="ampm"
                            value={rReminder.remindAt} autoOk={true}
                            onChange={this.onTimeChange}
                            floatingLabelText="At" floatingLabelFixed={true}/>
                        </div>
                    <div className="right">
                        <DurationPicker onChange={this.onDurationChange}
                            duration={rReminder.duration}/>
                        </div>
                    </div>
                </div>
        )
    }
    static defaultProps: {
        repeatedReminder: RepeatedReminder,
    }
}


RepeatedReminderCreator.propTypes = {
    repeatedReminder: React.PropTypes.object.isRequired,
    onSet: React.PropTypes.func.isRequired,
}
