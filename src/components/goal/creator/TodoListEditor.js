// @flow
import React from 'react';
import { RaisedButton } from 'material-ui';
import type {Habit, Task} from '../../../data/types';
import TaskEditor from './TaskEditor';
import HabitEditor from './HabitEditor';
import {TASK_ICON, HABIT_ICON} from '../icons';
import {habit} from '../../../reducers/goal-tracking/habits';
import {task} from '../../../reducers/goal-tracking/tasks';
import ActionDone from 'material-ui/svg-icons/action/done';


import FloatingCard from '../../utils/FloatingCard';

type Props = {
    initHabits: (?Habit)[],
    initTasks: (?Task)[],
    onChangeTasks: (tasks: Task[])=> void,
    onChangeHabits: (habits: Habit[])=>void
}

export default class TodoListEditor extends React.Component{
    state: {
        habits: (?Habit)[],
        tasks: (?Task)[],
        habitInitModes: boolean[],
        taskInitModes: boolean[],
    }
    constructor(props: Props){
        super(props);
        let hModes: boolean[] = [];
        props.initHabits.forEach(()=>hModes.push(false))
        let tModes: boolean[] = [];
        props.initTasks.forEach(()=>tModes.push(false))
        this.state = {
            habits: props.initHabits,
            tasks: props.initTasks,
            habitInitModes: hModes,
            taskInitModes: tModes,
        }
    }
    commitFuncHabit = (index: number) => {
        return (habit: Habit) => {
            let habits: (?Habit)[] = this.state.habits.slice();
            habits[index] = habit;
            this.setState({habits: habits});
            this.props.onChangeHabits(habits.filter((habit)=> habit !== null));
        }
    }
    commitFuncTask = (index: number) =>{
        return (task: Task) =>{
            let tasks: (?Task) []= this.state.tasks.slice();
            tasks[index] = task;
            this.setState({tasks: tasks});
            this.props.onChangeTasks(tasks.filter((task)=> task !== null));
        }
    }
    deleteFuncTask = (index: number) => {
        return ()=>{
            let tasks :(?Task)[] = this.state.tasks.slice();
            tasks[index] = null;
            this.setState({tasks: tasks});
            this.props.onChangeTasks(tasks.filter((task)=> task !== null));
        }
    }
    deleteFuncHabit = (index: number)=>{
        return () =>{
            let habits: (?Habit)[] = this.state.habits.slice();
            habits[index] = null;
            this.setState({habits: habits});
            this.props.onChangeHabits(habits.filter((habit)=> habit !== null));
        }
    }

    addHabit = ()=>{
        let habits: (?Habit)[] = this.state.habits.slice();
        habits.push(habit(undefined, null));
        let hModes: boolean[] = this.state.habitInitModes.slice();
        hModes.push(true);
        this.setState({habits: habits, habitInitModes: hModes});
        this.props.onChangeHabits(habits);
    }
    addTask = ()=>{
        let tasks: (?Task)[] = this.state.tasks.slice();
        tasks.push(task(undefined, null));
        let tModes: boolean[] = this.state.taskInitModes.slice();
        tModes.push(true);
        this.setState({tasks: tasks, taskInitModes: tModes});
        this.props.onChangeTasks(tasks);
    }

    render(){
        return (
        <div>
        <div className="col-2">
            <div className="left" style={{width: "48%"}}>
            <RaisedButton fullWidth={true} onTouchTap={this.addHabit} primary={true}
                icon={HABIT_ICON} label="Add a habit" labelPosition="after"/>
            <br/> <br/>
            {this.state.habits.map((habit: ?Habit, index: number)=>{
                    if(habit !== null){
                        return (
                            <div  key={index}>
                                <FloatingCard >
                                    <HabitEditor initHabit={habit} initEdit={this.state.habitInitModes[index]}
                                    onCommit={this.commitFuncHabit(index)} onDelete={this.deleteFuncHabit(index)} commitBtn={<ActionDone/>}/>
                                    </FloatingCard>
                                <br/>
                                </div>)
                    }
                    return null;
                }).filter((item: ?React$Element<any>): boolean=> item != null)}
            </div>
            <div className="right">
            <RaisedButton fullWidth={true} onTouchTap={this.addTask} primary={true}
                icon={TASK_ICON} label="Add a task" labelPosition="after"/>
            <br/><br/>
            {   this.state.tasks.map((task: ?Task, index: number)=>{
                    if(task !== null) {
                        return (
                            <div  key={index}>
                                <FloatingCard>
                                    <TaskEditor initTask={task} initEdit={this.state.taskInitModes[index]}
                                    onCommit={this.commitFuncTask(index)} onDelete={this.deleteFuncTask(index)} commitBtn={<ActionDone/>}/>
                                    </FloatingCard>
                                    <br/>
                                </div>
                        )
                    }
                    return null;
                }).filter((item: ?React$Element<any>): boolean=> item != null)}
            </div>
        </div>
        </div>);
    }
    static defaultProps:{
        initHabits: Habit[],
        initTasks: Task[],
    }
}

TodoListEditor.defaultProps = {
    initTasks: [],
    initHabits: [],
}

TodoListEditor.propTypes = {
    initTasks: React.PropTypes.array.isRequired,
    initHabits: React.PropTypes.array.isRequired,

    onChangeTasks: React.PropTypes.func.isRequired,
    onChangeHabits: React.PropTypes.func.isRequired,
}
