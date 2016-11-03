// @flow
const React = require("react");
import {TextField, RaisedButton} from 'material-ui';
import {TaskStatus} from '../../../data/index';
import ReminderCreator from './ReminderCreator';
import type {Task, Reminder, RepeatedReminder} from '../../../data/types';

export type TaskEditorStateEnum =
    | 1
    | 2
    | 3;

export const TaskEditorState: {[id:string]:TaskEditorStateEnum}= {
    CREATE_BUTTON: 1,
    EDITING: 2,
    PREVIEW: 3,
}

type State = {
    currState: TaskEditorStateEnum,
    task: Task,
}

type Props = {
    initTask: Task,
    initState: TaskEditorStateEnum,
    addTask: (task: Task) => void,
}
const emptyTask:Task= {
    name:"",
    description:"",
    status: TaskStatus.NOT_DONE,
    reminder:{
        remindAt: new Date(),
        duration: 0,
    },
}

// SingleTaskEditor represents a single task editor which
// has 3 states CREATE_BUTTON, EDITING and PREVIEW
export class SingleTaskEditor extends React.Component{
    static defaultProps: {
        initState: TaskEditorStateEnum,
    };
    state: State;

    constructor(props: Props) {
        super(props);
        let task: Task;
        if (props.initTask == null){
            task = emptyTask;
        }else{
            task = props.initTask;
        }
        this.state = {
            currState: props.initState,
            task: task,
        }
    }

    onCreate = () =>{
        this.setState({currState: TaskEditorState.EDITING});
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
    onCreateReminder = (reminder:Reminder )=>{
        let newTask:Task= Object.assign({},this.state.task, {reminder: reminder});
        delete newTask["repeatedReminder"];
        this.setState({task: newTask});
        console.log(newTask);
    }
    onCreateRepeatedReminder = (reReminder: RepeatedReminder)=>{
        let newTask:Task= Object.assign({},this.state.task, {repeatedReminder: reReminder});
        delete newTask["reminder"];
        this.setState({task: newTask});
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
                <ReminderCreator
                    repeated={true}
                    reminder={this.state.task.reminder}
                    repeatedReminder={this.state.task.repeatedReminder}
                    onSetReminder={this.onCreateReminder}
                    onSetRepeatedReminder={this.onCreateRepeatedReminder}/>
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
