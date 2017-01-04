// @flow

import React from 'react';
import {DatePicker, TimePicker} from 'material-ui';
import {formatDate} from '../../timeutils';

// DateTimePicker allows user to pick a date and time and extract date and time which is in RFC 3339
export default class DateTimePicker extends React.Component {
    static defaultProps: {
        onChange: (date: Date) => void,
        disableDate: (date: Date) => boolean,
        dateTime: Date,
    }

    props: {
        onChange: (date:Date) => void,
        disableDate: (date:Date)=> boolean,
        dateTime: Date,
        dateLabel:string,
        timeLabel: string,
    }

    onDateChange =  (_:Event, date:Date) => {
        let copied:Date = new Date(this.props.dateTime);
        copied.setDate(date.getDate())
        copied.setMonth(date.getMonth());
        copied.setFullYear(date.getFullYear());
        this.props.onChange(copied);
    }

    onTimeChange = (_:Event, time:Date) => {
        let copied: Date = new Date(this.props.dateTime);
        copied.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
        this.props.onChange(copied);
    }

    render() {
        return (
            <div className="col-2">
                <div className="left">
                    <DatePicker
                        shouldDisableDate={this.props.disableDate}
                        floatingLabelText={this.props.dateLabel}
                        floatingLabelFixed={true} container="inline"
                        formatDate={formatDate} value={this.props.dateTime}
                        onChange={this.onDateChange}/>
                </div>
                <div className="right">
                    <TimePicker
                        format='ampm' floatingLabelText={this.props.timeLabel}
                        floatingLabelFixed={true} autoOk={true}
                        pedantic={true} 
                        value={this.props.dateTime}
                        onChange={this.onTimeChange}/>
                </div>
            </div>)
    }
}

DateTimePicker.defaultProps = {
    dateTime: new Date(), // date is the current date + time
    onChange: (datetime) => { console.log(datetime) },
    disableDate: (date) => { return false;}
}

DateTimePicker.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    disableDate: React.PropTypes.func,
    dateLabel: React.PropTypes.string.isRequired,
    timeLabel: React.PropTypes.string.isRequired,
}
