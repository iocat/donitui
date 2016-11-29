// @flow
import React from 'react';

import {TextField, Checkbox} from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {ActivatableButton} from '../../utils/Button';
import ReminderCreator from './reminder/ReminderCreator';
import RepeatedReminderCreator from './reminder/RepeatedReminderCreator';
import {taskIcon, habitIcon} from '../icons';

import {ReminderCycle} from '../../../data/index';
import type {Task, Reminder, RepeatedReminder} from '../../../data/types';

// TODO: check valid range of value
const validReminder = (r: Reminder)=>{
    if (!r.remindAt || !r.duration) {
        return false;
    }
    return true;
}

const validRReminder = (rr: RepeatedReminder)=>{
    if(!rr.remindAt || !rr.duration || !rr.cycle){
        return false;
    }
    return true;
}

const validName = (name: string)=>{
    return name.length !== 0;
}

type Props = {
    initReminder: Reminder,
    initRReminder: RepeatedReminder,
    initHabit: boolean,
}

export default class EditModeTaskEditor extends React.Component{
    state: {
        reminder: Reminder,
        rReminder: RepeatedReminder,
        isHabit: boolean,
        changeName: boolean,
    }
    static defaultProps:{
        initHabit: boolean,
        initReminder: Reminder,
        initRReminder: RepeatedReminder,
    }
    constructor(props: Props){
        super(props);
        this.state = {
            reminder: props.initReminder,
            rReminder: props.initRReminder,
            isHabit: props.initHabit,
            changeName: false,
        }
    }

    // task validation
    isTaskCreatable = () => {
        let task:Task = this.props.task;
        let vr: boolean = false;
        if (this.state.isHabit){
            vr = validRReminder(this.state.rReminder);
        }else {
            vr = validReminder(this.state.reminder);
        }
        return vr && validName(task.name) ;
    }

    onSetName = (e: any)=>{
        this.setState({changeName: true});
        this.props.onSetName(e.target.value);
    }

    onSwitchReminder = (e: Event, checked: boolean) =>{
        this.setState({isHabit:checked});
        if(checked) {
            this.props.onSetRepeatedReminder(this.state.rReminder);
        }else{
            this.props.onSetReminder(this.state.reminder);
        }
    }

    onSetReminder = (r: Reminder) =>{
        this.setState({reminder: r});
        this.props.onSetReminder(r);
    }

    onSetRepeatedReminder = (rR: RepeatedReminder) =>{
        this.setState({rReminder: rR});
        this.props.onSetRepeatedReminder(rR);
    }

    getNameErrorMessage = (): string =>{
        if(this.state.changeName && !validName(this.props.task.name)){
            return "Task's name is invalid";
        }
        return "";
    }

    render() {
        let taskType: string
        let reminderCreator: any
        let task: Task = this.props.task;
        if (this.state.isHabit){
            taskType = "Repeatable"
            reminderCreator = <RepeatedReminderCreator
                repeatedReminder={this.state.rReminder}
                onSet={this.onSetRepeatedReminder}/>
        }else{
            taskType = "Non-repeated";
            reminderCreator = <ReminderCreator
                reminder={this.state.reminder}
                onSet={this.onSetReminder}/>
        }
        let nameError: string = this.getNameErrorMessage();
        return (
            <div>
                <TextField
                    onChange={this.onSetName}
                    defaultValue={task.name}
                    errorText={nameError}
                    hintText="Do this and complete your goal!"
                    floatingLabelText="Task" floatingLabelFixed={true}
                    multiLine={false}/>
                <br/><br/>
                <Checkbox label={taskType}
                    checkedIcon={habitIcon}
                    uncheckedIcon={taskIcon}
                    checked={this.state.isHabit}
                    onCheck={this.onSwitchReminder}/>
                {reminderCreator}
                <div className="delete-btn btn">
                    <ActivatableButton
                        active={true}
                        func={this.props.onDelete}>
                        <ActionDelete/>
                        </ActivatableButton>
                    </div>
                <div className="confirm-btn btn">
                    <ActivatableButton
                        active={this.isTaskCreatable()}
                        func={this.props.onCreate}>
                        {this.props.onCreateBtn}
                        </ActivatableButton>
                    </div>
                </div>
        );
    }
}

EditModeTaskEditor.defaultProps = {
    initHabit: false,
    initReminder: {
        remindAt: new Date(),
        duration: 0,
    },
    initRReminder: {
        cycle: ReminderCycle.EVERY_DAY,
        remindAt: new Date(),
        days: {},
        duration: 0,
    }
}


EditModeTaskEditor.propTypes = {
    initReminder: React.PropTypes.object,
    initRReminder:React.PropTypes.object,
    initHabit: React.PropTypes.bool.isRequired,

    task: React.PropTypes.object,
    onSetName: React.PropTypes.func.isRequired,
    onSetReminder: React.PropTypes.func,
    onSetRepeatedReminder: React.PropTypes.func,

    onCreate: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    // the button that show up to accept this task
    onCreateBtn: React.PropTypes.object.isRequired,
}
