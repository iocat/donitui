// @flow

import React from 'react';
import {DatePicker, TimePicker} from 'material-ui';
import moment from 'moment';

const formatDate = (date: Date):string => {
    return moment(date).format("dddd, MMM Do YYYY");
}

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
        copied.setDate(date);
        this.props.onChange(copied);
    }

    onTimeChange = (_:Event, time:Date) => {
        let copied: Date = new Date(this.props.dateTime);
        copied.setTime(time);
        this.props.onChange(copied);
    }

    render() {
        return (
            <div className="time-picker-group">
                <div className="date-picker">
                    <DatePicker
                        shouldDisableDate={this.props.disableDate}
                        floatingLabelText={this.props.dateLabel}
                        floatingLabelFixed={true} mode="landscape"
                        textFieldStyle={{ width: '100%' }} container="inline"
                        formatDate={formatDate} onChange={this.onDateChange}
                        value={this.props.dateTime} />
                </div>
                <div className="time-picker">
                    <TimePicker
                        onChange={this.onTimeChange}
                        format='ampm' floatingLabelText={this.props.timeLabel}
                        container="inline" floatingLabelFixed={true}
                        pedantic={true} textFieldStyle={{ width: '100%' }}
                        value={this.props.dateTime} />
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
