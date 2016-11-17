import React from 'react';

import ContentAdd from 'material-ui/svg-icons/content/add';
import {TextField, Checkbox} from 'material-ui';
import {ActivatableButton} from '../../utils/Button';
import ReminderCreator from './reminder/ReminderCreator';
import RepeatedReminderCreator from './reminder/RepeatedReminderCreator';
import {taskIcon, habitIcon} from '../icons';

import {ReminderCycle} from '../../../data/index';
import type {Task, Reminder, RepeatedReminder} from '../../../data/types';


// TODO: check valid range of value
const validReminder = (r: Remidner)=>{
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

const validDesc = (desc: string) =>{
    return true;
}


export default class EditModeTaskEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reminder: props.initReminder,
            rReminder: props.initRReminder,
            isHabit: props.initHabit,
        }
    }

    // task validation
    isTaskCreatable = () => {
        let task:Task = this.props.task;
        let vr: boolean = false;
        console.log(this.state.rReminder);
        if (this.state.isHabit){
            vr = validRReminder(this.state.rReminder);
        }else {
            vr = validReminder(this.state.reminder);
        }
        return vr && validName(task.name) && validDesc(task.description);
    }

    onSetName = (e: Event)=>{
        let setName: (name:string)=>void = this.props.onSetName;
        setName(e.target.value);
    }

    onSetDescription = (e:Event)=>{
        let setDescription: (desc: string)=>void = this.props.onSetDescription;
        setDescription(e.target.value);
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

    render() {
        let taskType: string
        let reminderCreator: any
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
        return (
            <div>
                <TextField
                    onBlur={this.onSetName}
                    hintText="Do this and complete your goal!"
                    floatingLabelText="Task" floatingLabelFixed={true}
                    multiLine={false} autoFocus/>
                <br/>
                <TextField
                    onBlur={this.onSetDescription}
                    floatingLabelText="Description" multiLine={true}/>
                <br/>
                <br/>
                <Checkbox label={taskType}
                    checkedIcon={habitIcon}
                    uncheckedIcon={taskIcon}
                    checked={this.state.isHabit}
                    onCheck={this.onSwitchReminder}/>
                <br/>
                {reminderCreator}
                <div className="confirm-btn btn">
                    <ActivatableButton
                        active={this.isTaskCreatable()}
                        func={this.props.onCreate}>
                        <ContentAdd/>
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
    onSetDescription: React.PropTypes.func.isRequired,
    onSetReminder: React.PropTypes.func,
    onSetRepeatedReminder: React.PropTypes.func,

    onCreate: React.PropTypes.func.isRequired,
}
