// @flow
const React = require("react");
import { RaisedButton } from 'material-ui';
import {TaskStatus} from '../../../data/index';
import type {Task, Reminder, RepeatedReminder} from '../../../data/types';

import EditModeTaskEditor from './EditModeTaskEditor';

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
// TODO: change this to stateless (the only state it should has is
// the UI state, data should be props!)
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

    switchMode = (mode: TaskEditorStateEnum)=>{
        return ()=>{
            this.setState({currState: mode});
        }
    }

    onCreateReminder = (reminder:Reminder )=>{
        let newTask:Task= Object.assign({},this.state.task, {reminder: reminder});
        delete newTask["repeatedReminder"];
        this.setState({task: newTask});
    }

    onCreateRepeatedReminder = (reReminder: RepeatedReminder)=>{
        let newTask:Task= Object.assign({},this.state.task, {repeatedReminder: reReminder});
        delete newTask["reminder"];
        this.setState({task: newTask});
    }

    onSetName = (name: string)=>{
        let newTask:Task = Object.assign({},this.state.task,{name:name});
        this.setState({task:newTask});
    }

    onSetDescription = (desc: string)=>{
        let nt:Task = Object.assign({},this.state.task,{description: desc});
        this.setState({task:nt});
    }

    getPreviewUI = () => {
        return (<p> NOT YET IMPLEMENTED </p>);
    }

    // callback to accept the task state
    acceptTask = ()=>{
        // TODO
        console.log("Task accepted: ");
        console.log(this.state.task);
    }
    render(){
        let task: Task = this.state.task;

        switch(this.state.currState){
        case TaskEditorState.CREATE_BUTTON:
            return (
                <RaisedButton
                    fullWidth={true}
                    onTouchTap={this.switchMode(TaskEditorState.EDITING)}
                    style={{textAlign:"center"}}
                    label="Set A Task Reminder"/>
            );

        case TaskEditorState.EDITING:
            let initHabit :boolean = false;
            if (task.repeatedReminder){
                initHabit = true;
            }

            return <EditModeTaskEditor
                    task={task}
                    initHabit={initHabit}
                    initReminder={task.reminder}
                    initRReminder={task.repeatedReminder}
                    onSetName={this.onSetName}
                    onSetDescription={this.onSetDescription}
                    onSetReminder={this.onCreateReminder}
                    onSetRepeatedReminder={this.onCreateRepeatedReminder}
                    onCreate={this.acceptTask}
                    />;

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
