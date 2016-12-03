// @flow
const React = require("react");
import { CardText } from 'material-ui';
import {TaskStatus} from '../../../data/index';
import type {Task, Reminder, RepeatedReminder} from '../../../data/types';
import HabitItem from '../card/HabitItem';
import TaskItem from '../card/TaskItem';
import EditModeTaskEditor from './EditModeTaskEditor';
import {habitIcon, taskIcon} from '../icons';
import ContentAdd from 'material-ui/svg-icons/content/add';

import taskReducer from '../../../reducers/goal-tracking/task';
import {ActionCreators} from '../../../actions';

export type TaskEditorStateEnum =
    | 1
    | 2;

export const TaskEditorState: {[id:string]:TaskEditorStateEnum}= {
    EDITING: 1,
    PREVIEW: 2,
}

type State = {
    currState: TaskEditorStateEnum,
}

type Props = {
    initTask: Task,
    initState: TaskEditorStateEnum,
    acceptTask: (task: Task) => void,
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
        this.state = {
            currState: props.initState,
        }
    }

    switchMode = (mode: TaskEditorStateEnum)=>{
        return ()=>{
            this.setState({currState: mode});
        }
    }

    onCreateReminder = (reminder:Reminder )=>{
        let newTask:Task= Object.assign({},this.props.task, {status: TaskStatus.NOT_DONE, reminder: reminder});
        delete newTask["repeatedReminder"];
        newTask = taskReducer(newTask, ActionCreators.goals_LOAD_GOAL(newTask, new Date().getTime()));
        this.props.stageTask(newTask);
    }

    onCreateRepeatedReminder = (rReminder: RepeatedReminder)=>{
        let newTask:Task= Object.assign({},this.props.task, {status: TaskStatus.NOT_DONE, repeatedReminder: rReminder});
        delete newTask["reminder"];
        newTask = taskReducer(newTask, ActionCreators.goals_LOAD_GOAL(newTask, new Date().getTime()));
        this.props.stageTask(newTask);
    }

    onSetName = (name: string)=>{
        let newTask:Task = Object.assign({},this.props.task,{name:name});
        this.props.stageTask(newTask);
    }

    // callback to accept the task state
    acceptTask = ()=>{
        this.setState({currState: TaskEditorState.PREVIEW});
        this.props.acceptTask();
    }

    render(){
        let task: Task = this.props.task;
        switch(this.state.currState){
        case TaskEditorState.EDITING:
            let initHabit :boolean = false;
            if (task.repeatedReminder){
                initHabit = true;
            }
            return (
                <CardText>
                    <EditModeTaskEditor
                        task={task} initHabit={initHabit}
                        initReminder={task.reminder} onSetName={this.onSetName}
                        initRReminder={task.repeatedReminder}
                        onSetReminder={this.onCreateReminder}
                        onSetRepeatedReminder={this.onCreateRepeatedReminder}
                        onCreate={this.acceptTask} onDelete={this.props.deleteTask}
                        onCreateBtn={this.props.acceptBtn}
                        />
                    </CardText>
            )
        case TaskEditorState.PREVIEW:
            if (task.reminder){
                return <TaskItem
                    leftIcon={taskIcon}
                    onTouchTap={this.switchMode(TaskEditorState.EDITING)}
                    task={task}/>
            }else if(task.repeatedReminder) {
                return <HabitItem
                    leftIcon={habitIcon}
                    onTouchTap={this.switchMode(TaskEditorState.EDITING)}
                    habit={task}/>
            }
            console.log("unexpected reminder");
            return null;
        default:
            console.error("unexpected state for TaskEditor")
        }
    }
}

SingleTaskEditor.defaultProps={
    initState: TaskEditorState.CREATE_BUTTON,
    isCreating: false,
    acceptBtn: <ContentAdd/>,
}

SingleTaskEditor.propTypes={
    task: React.PropTypes.object.isRequired,

    // stageTask: allows the task to be saved when a change occurs
    stageTask: React.PropTypes.func.isRequired,
    // acceptTask is a callback to allow the task to be completed
    acceptTask: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
    initState: React.PropTypes.oneOf([TaskEditorState.EDITING, TaskEditorState.PREVIEW]),

    acceptBtn: React.PropTypes.object,
}
