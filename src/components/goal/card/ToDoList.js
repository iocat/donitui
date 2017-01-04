import React from 'react';

import Divider from 'material-ui/Divider';
import TaskItem from './TaskItem';
import HabitItem from './HabitItem';
import {List} from 'material-ui';
import {TASK_ICON, HABIT_ICON} from '../icons';

export default class ToDoList extends React.Component {
    render() {
        let tasks = this.props.tasks;
        let habits = this.props.habits;
        let divider = null
        if (tasks.length > 0 && habits.length !== 0) {
            divider = <Divider inset={true}/>
        }
        return (
            <List>
                {tasks.map(function(task, index) {
                    let leftIcon = null
                    if (index === 0) {
                        leftIcon = TASK_ICON
                    }
                    return (<TaskItem className="todo-item" key={index} leftIcon={leftIcon} insetChildren={true} task={task}/>)
                })}
                {divider}
                {habits.map(function(habit, index) {
                    let leftIcon = null
                    if (index === 0) {
                        leftIcon = HABIT_ICON
                    }
                    return (<HabitItem className="todo-item" key={index} leftIcon={leftIcon} insetChildren={true} habit={habit}/>)
                })}
                {this.props.children}
            </List>
        )
    }
}

ToDoList.propTypes = {
    // A dictionary of task
    tasks: React.PropTypes.array.isRequired,
    habits: React.PropTypes.array.isRequired,
}
