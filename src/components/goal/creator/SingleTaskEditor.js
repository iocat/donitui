import React from 'react';
import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import {TaskStatus} from '../../../data/index';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

export const TaskEditorState = {
    CREATE_BUTTON: 1,
    EDITTING: 2,
    PREVIEW: 3,
}

export const ReminderState = {
    NON_REPEATED: 1,
    REPEATED: 2,
}

export class SingleTaskEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currState: props.initState,
        
        }
    }

    onCreate = () =>{
        this.setState({currState: TaskEditorState.EDITTING});
    }

    render(){
        switch(this.state.currState){
        case TaskEditorState.CREATE_BUTTON:
            return (
                <RaisedButton 
                    fullWidth={true}
                    onTouchTap={this.onCreate}
                    style={{textAlign:"center"}} 
                    label="Add A Task Reminder"/>
            );
        case TaskEditorState.EDITTING:
            return (
                <div> 
                    <TextField 
                        hintText="Do this and complete your goal!"
                        floatingLabelText="Task"
                        floatingLabelFixed={true}
                        multiLine={false} autoFocus/>
                    <br/>
                    <TextField
                        hintText="Some details please!" 
                        floatingLabelText="Description"
                        floatingLabelFixed={true}
                        multiLine={true}/>
                    <br/>
                    <TimePicker
                        format='ampm'
                        floatingLabelText="Start At"
                        floatingLabelFixed={true}
                        pedantic={true}/>
                    <DatePicker 
                        floatingLabelText="Start On"
                        floatingLabelFixed={true}/>
                    <TimePicker
                        format='ampm'
                        floatingLabelText="End At"
                        floatingLabelFixed={true}
                        pedantic={true}/>
                    <DatePicker
                        floatingLabelText="End On"
                        floatingLabelFixed={true}/>
                    </div>
            );
        default: 
            console.log("panic")
        }
    }
}

SingleTaskEditor.defaultProps={
    initState: TaskEditorState.CREATE_BUTTON,
}

SingleTaskEditor.propTypes={
    initTask: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        status: React.PropTypes.oneOf([TaskStatus.DONE, 
            TaskStatus.IN_PROGRESS, TaskStatus.NOT_DONE]),
        reminder: React.PropTypes.object,
        repeatedReminder: React.PropTypes.object,
    }),
    addTask: React.PropTypes.func.isRequired,
    initState: React.PropTypes.oneOf([TaskEditorState.CREATE_BUTTON, 
        TaskEditorState.EDITTING, TaskEditorState.PREVIEW]),
}