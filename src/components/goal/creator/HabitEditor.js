// @flow
import React from 'react';
import PreviewableEditor from './PreviewableEditor';
import RepeatedReminderCreator from './reminder/RepeatedReminderCreator';
import HabitItem from '../card/HabitItem';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {ActivatableButton} from '../../utils/Button';

import { TextField, Dialog } from 'material-ui';

import type {RepeatedReminder} from './reminder/RepeatedReminderCreator';
import type {Habit} from '../../../data/types';
import {durationToDate} from '../../../timeutils'

import {getHabitStatus} from '../../../timeutils';

type Props = {
    initHabit: Habit,
    initEdit: boolean,
    onDelete: ()=>void,
    onCommit: (habit: Habit)=>void,
    commitBtn: any,
}


// apply the reminder to habit
function remReducer(habit: Habit, rr: RepeatedReminder): Habit{
    let hours = rr.remindAt.getHours(),
        minutes = rr.remindAt.getMinutes(),
        seconds = rr.remindAt.getSeconds(),
        offset = 3600*hours + minutes * 60 + seconds,
        nh = Object.assign({}, habit, {
            days: rr.days,
            duration: rr.duration,
            offset: offset
        });
    nh.status = getHabitStatus(nh, new Date().getTime());
    return nh;
}

// get the reminder from habit
function remFrom(habit: Habit):RepeatedReminder{
    let remindAt: Date = durationToDate(habit.offset);
    return {
        days: habit.days,
        duration: habit.duration,
        remindAt: remindAt,
    }
}

function invalidName(name: string): boolean{
    return name.length === 0 || name.length > 60
}

function invalidDuration(habit: Habit):boolean{
    return habit.duration === 0 || habit.duration > 86400
}

function validDays(habit: Habit): boolean{
    for (let i = 0; i < 7; i ++ ){
        if (habit.days[i] === true){
            return true;
        }
    }
    return false;
}

export default class HabitEditor extends React.Component{
    constructor(props: Props){
        super(props);
        this.state = {
            habit: props.initHabit,
            nameChanged: false,
            remChanged: false,
        }
    }
    state: {
        habit: Habit,
        nameChanged: boolean,
        remChanged: boolean
    }
    getNameError = ():?string=>{
        if(this.state.nameChanged && invalidName(this.state.habit.name)){
            return "Invalid name (should be between 0 and 60 characters)"
        }
        return null;
    }
    getReminderError = ():?string=>{
        if(this.state.remChanged ===true){
            if(!validDays(this.state.habit)){
                return "Invalid Days. Please choose at least one day for this habit"
            }
        }
        return null
    }
    onSetName = (e: Event) =>{
        this.setState({
            habit: Object.assign({},this.state.habit, {name: e.target.value}),
            nameChanged: true,
        });
    }
    onSetRepeatedReminder = (reminder: RepeatedReminder) =>{
        this.setState({
            habit: remReducer(this.state.habit, reminder),
            remChanged: true,
        });
    }
    decorateDataCheck = (confirmFn: ()=>void)=> {
        return ()=>{
            if(invalidName(this.state.habit.name)){
                this.setState({nameChanged: true});
                return;
            }
            if(invalidDuration(this.state.habit) || !validDays(this.state.habit)){
                this.setState({remChanged: true});
                return;
            }
            confirmFn();
        }
    }
    getEditor = (modeSwch: ()=> void) =>{
        let habit: Habit = this.state.habit,
            confirmFn = () => {
                this.props.onCommit(this.state.habit);
                modeSwch();
            },
            deleteFn = ()=>{
                this.props.onDelete();
                modeSwch();
            },
            habitName = ()=>{
                if(this.state.habit.name !== null && this.state.habit.name.length > 0){
                    return "\""+this.state.habit.name+"\"";
                }
                return ""
            }
        return <Dialog className="todo-editor" title={"Edit "+habitName()} open={true}>
            <TextField multiLine={false} errorText={this.getNameError()}
                onChange={this.onSetName} defaultValue={habit.name}
                hintText="Habit" floatingLabelText="Habit" floatingLabelFixed={true}/>
            <RepeatedReminderCreator
                repeatedReminder={remFrom(this.state.habit)}
                onSet={this.onSetRepeatedReminder}/>
            <div className="delete-btn btn">
                <ActivatableButton active={true} func={deleteFn}>
                    <ActionDelete/>
                    </ActivatableButton>
                </div>
            <div className="confirm-btn btn">
                <ActivatableButton func={this.decorateDataCheck(confirmFn)}>
                    {this.props.commitBtn}
                    </ActivatableButton>
                </div>
            <p style={{color:"red"}}> {this.getReminderError()}</p>
            </Dialog>
    }

    getPreviewer = (modeSwch: ()=> void) =>{
        return <HabitItem habit={this.state.habit} onTouchTap={modeSwch}/>
    }

    render() {
        return <PreviewableEditor initEdit={this.props.initEdit} editor={this.getEditor}
                    previewer={this.getPreviewer}/>
    }
    static defaultProps:{
        initEdit: boolean,
    }
}

HabitEditor.defaultProps = {
    initEdit: false,
}

HabitEditor.propTypes = {
    // The commit function for confirmation
    onCommit: React.PropTypes.func.isRequired,
    // The delete function
    onDelete: React.PropTypes.func.isRequired,
    // The initial task passed in
    initHabit: React.PropTypes.object.isRequired,

    commitBtn: React.PropTypes.node,
    initEdit: React.PropTypes.bool,
}
