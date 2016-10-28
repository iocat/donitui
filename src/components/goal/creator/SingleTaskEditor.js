// @flow
const React = require("react");
import {TextField, RaisedButton} from 'material-ui';
import {TaskStatus} from '../../../data/index';
import DateTimePicker from '../../utils/DateTimePicker';
import type {Task} from '../../../data/types';

export type ReminderStateEnum =
    | 1
    | 2;

export const ReminderState: {[id:string]:ReminderStateEnum} = {
    NON_REPEATED: 1,
    REPEATED: 2,
}

export type TaskEditorStateEnum =
    | 1
    | 2
    | 3;

export const TaskEditorState: {[id:string]:TaskEditorStateEnum}= {
    CREATE_BUTTON: 1,
    EDITING: 2,
    PREVIEW: 3,
}

type Props = {
    initTask: Task,
    initState: TaskEditorStateEnum,
    addTask: (task: Task) => void,
}

const getEndDateLimitFunc = function(startDate:Date):(date: Date)=>boolean{
    if (startDate ){
        return function(date: Date): boolean{
            if (date.getFullYear() < startDate.getFullYear()) {
                return true
            }else if (date.getFullYear() == startDate.getFullYear()){
                if (date.getMonth() < startDate.getMonth()){
                    return true
                }else if (date.getMonth() == startDate.getMonth()){
                    return date.getDate() < startDate.getDate()
                }
            }
            return false;
        }
    }
    return (date:Date):boolean => false
}

export class SingleTaskEditor extends React.Component{
    static defaultProps: {
        initState: TaskEditorStateEnum,
    }
    state:{
        currState: TaskEditorStateEnum,
        reminderState: ReminderStateEnum,
        task: Task,
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            currState: props.initState,
            task: props.initTask,
            reminderState: ReminderState.NON_REPEATED,
        }
    }

    onCreate = () =>{
        this.setState({currState: TaskEditorState.EDITING});
    }

    onSwitchReminderState = (state: ReminderStateEnum)=>{
        this.setState({
            reminderState: state,
        })
    }

    onStartDateTimeChange = (newDt: Date) => {

    }

    onEndDateTimeChange = (newDt: Date) =>{

    }

    getReminderCreator = (reminderState: number) =>{
        switch(reminderState){
            case ReminderState.NON_REPEATED:
                return (
                    <div>
                        <DateTimePicker onChange={this.onStartDateTimeChange}
                            dateLabel="Start Date" timeLabel="Start Time"/>
                        <DateTimePicker onChange={this.onEndDateTimeChange}
                            dateLabel="End Date" timeLabel="End Time"/>
                    </div>
                );
            case ReminderState.REPEATED:
                return (<div>Repeat plz</div>);
            default:
                console.log("panic: expect a proper ReminderState");
        }
    }

    getCreateButtonUI = ()=>{
        return (
            <RaisedButton
                fullWidth={true}
                onTouchTap={this.onCreate}
                style={{textAlign:"center"}}
                label="Add A Task Reminder"/>
        );
    }
    getEditingBoxUI = ()=>{
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
                {this.getReminderCreator(this.state.reminderState)}
            </div>
        );
    }
    getPreviewUI = () => {
        return (<p> NOT YET IMPLEMENTED </p>);
    }
    render(){
        switch(this.state.currState){
        case TaskEditorState.CREATE_BUTTON:
            return this.getCreateButtonUI();
        case TaskEditorState.EDITING:
            return this.getEditingBoxUI();
        case TaskEditorState.PREVIEW:
            return this.getPreviewUI();
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
        status: React.PropTypes.oneOf([TaskStatus.DONE,TaskStatus.IN_PROGRESS, TaskStatus.NOT_DONE]),
        reminder: React.PropTypes.object,
        repeatedReminder: React.PropTypes.object,
    }),
    addTask: React.PropTypes.func.isRequired,
    initState: React.PropTypes.oneOf([TaskEditorState.CREATE_BUTTON,
        TaskEditorState.EDITING, TaskEditorState.PREVIEW]),
}
