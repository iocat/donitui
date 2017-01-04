// @flow
const React = require('react');
import {TimePicker} from 'material-ui';
import {timeToDuration, durationToDate} from '../../../../timeutils';

export default class DurationPicker extends React.Component{
    state:{
        changed: boolean,
    }
    static defaultProps: {
        fullWidth: boolean,
    }
    constructor(){
        super();
        this.state={
            changed: false,
        }
    }
    // when the duration is changed
    onDurationChange = (_:Event, date:Date)=>{
        this.setState({changed:true});
        this.props.onChange(timeToDuration(date));
    }

    render(){
        let duration: number= this.props.duration;
        let errorTxt: string = "";
        if (duration === 0 && this.state.changed){
            errorTxt = "Duration must not be 0"
        }
        return (
            <TimePicker format="24hr"
                onChange={this.onDurationChange} fullWidth={this.props.fullWidth}
                value={durationToDate(duration)}
                hintText="Duration hh:mm" autoOk={true}
                floatingLabelText="For" floatingLabelFixed={true}
                errorText={errorTxt} />
        )
    }
}

DurationPicker.defaultProps ={
    fullWidth: false,
}

DurationPicker.propTypes = {
    fullWidth: React.PropTypes.bool,
    duration: React.PropTypes.number.isRequired,
    // function(duration: number)
    onChange: React.PropTypes.func.isRequired,
}
