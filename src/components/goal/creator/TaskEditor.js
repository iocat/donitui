// @flow

import React from 'react';
import ReminderCreator from './reminder/ReminderCreator';
import TaskItem from '../card/TaskItem';
import {getTaskStatus} from '../../../timeutils';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {ActivatableButton} from '../../utils/Button';
import PreviewableEditor from './PreviewableEditor';

import { TextField, Dialog } from 'material-ui';

import type {Reminder} from './reminder/ReminderCreator';
import { Status } from '../../../data/index';
import type {Task} from '../../../data/types';


let reminderFromTask = (task: Task): Reminder =>{
    return {
        remindAt: task.remindAt,
        duration: task.duration,
    }
}

let toTask = (task: Task, reminder: Reminder): Task =>{
    let nt: Task = Object.assign({}, task, reminder, {status: Status.INACTIVE});
    nt.status =  getTaskStatus(nt, new Date().getTime());
    return nt;
}

type Props = {
    initTask: Task,
    initEdit: boolean,
    onDelete: ()=>void,
    onCommit: (task: Task)=>void,
    commitBtn: any,
}


function invalidName(name: string): boolean{
    return name.length === 0 || name.length > 60
}

function invalidDuration(habit: Habit):boolean{
    return habit.duration === 0 || habit.duration > 86400
}

export default class TaskEditor extends React.Component{
    props: Props
    constructor(props:Props){
        super(props);
        this.state = {
            task: props.initTask,
            nameChanged: false,
            remChanged: false,
        }
    }
    state: {
        task: Task,
        nameChanged: boolean,
        remChanged: boolean,
    }
    onSetName = (e: Event) =>{
        this.setState({ task: Object.assign({},this.state.task, {name: e.target.value})});
    }
    onSetReminder = (reminder: Reminder) =>{
        this.setState({ task: toTask(this.state.task, reminder) });
    }

    getNameError = ():?string=>{
        if(this.state.nameChanged && invalidName(this.state.task.name)){
            return "Invalid name (should be between 0 and 60 characters)"
        }
        return null;
    }

    getEditor = (modeSwitcher: ()=>void)=>{
        let task: Task = this.state.task;
        let confirmFn = ()=> {
            this.props.onCommit(this.state.task);
            modeSwitcher();
        }
        return <Dialog className="todo-editor" title={"Edit \""+ this.state.task.name+"\""} modal={true} open={true}>
            <TextField multiLine={false} errorText={this.getNameError()}
                onChange={this.onSetName} defaultValue={task.name}
                hintText="Task" floatingLabelText="Task" floatingLabelFixed={true}/>
            <ReminderCreator
                reminder={reminderFromTask(this.state.task)}
                onSet={this.onSetReminder}/>
            <div className="delete-btn btn">
                <ActivatableButton active={true} func={()=>{this.props.onDelete(); modeSwitcher()}}>
                    <ActionDelete/>
                    </ActivatableButton>
                </div>
            <div className="confirm-btn btn">
                <ActivatableButton func={this.decorateDataCheck(confirmFn)}>
                    {this.props.commitBtn}
                    </ActivatableButton>
                </div>
            </Dialog>
    }

    getPreviewer = (modeSwitcher: ()=>void)=>{
        return <TaskItem onTouchTap={modeSwitcher} task={this.state.task}/>
    }

    decorateDataCheck = (confirmFn: ()=>void)=> {
        return ()=>{
            if(invalidName(this.state.task.name)){
                this.setState({nameChanged: true});
                return;
            }
            if(invalidDuration(this.state.task) ){
                this.setState({remChanged: true});
                return;
            }
            confirmFn();
        }
    }

    render(){
        return <PreviewableEditor initEdit={this.props.initEdit} editor={this.getEditor}
                    previewer={this.getPreviewer}/>
    }
    static defaultProps:{
        initEdit: boolean
    }
}

TaskEditor.defaultProps={
    initEdit: false
}

TaskEditor.propTypes = {
    // The commit function for confirmation
    onCommit: React.PropTypes.func.isRequired,
    // The delete function
    onDelete: React.PropTypes.func.isRequired,
    // The initial task passed in
    initTask: React.PropTypes.object.isRequired,

    commitBtn: React.PropTypes.node,
    initEdit: React.PropTypes.bool.isRequired,
}
