import React from 'react';

import Divider from 'material-ui/Divider';
import TaskItem from './TaskItem';
import HabitItem from './HabitItem';
import {List} from 'material-ui/List';
import {taskIcon, habitIcon} from '../icons';

export default class ToDoList extends React.Component {
    // tasks is a dictionary of tasks or an array
    habitsAndTasks(tasks) {
        let habits = [];
        let nortasks = []; // Normal tasks
        if (tasks instanceof Object) {
            let tks = Object.keys(tasks);
            tks.forEach((tk) => {
                let task = tasks[tk];
                if (task.reminder) {
                    nortasks.push(task);
                } else if (task.repeatedReminder) {
                    habits.push(task);
                }
            })
        } else if (tasks instanceof Array) {
            tasks.forEach((task) => {
                if (task.reminder) {
                    nortasks.push(task);
                } else if (task.repeatedReminder) {
                    habits.push(task);
                }
            })
        }
        return {habits: habits, tasks: nortasks}
    }
    render() {
        let sep = this.habitsAndTasks(this.props.tasks);
        let tasks = sep.tasks;
        let habits = sep.habits;
        let divider = null
        if (tasks.length > 0 && habits.length !== 0) {
            divider = <Divider inset={true}/>
        }

        return (
            <List>
                {tasks.map(function(task, index) {
                    let leftIcon = null
                    if (index === 0) {
                        leftIcon = taskIcon
                    }
                    return (<TaskItem className="todo-item" key={index} leftIcon={leftIcon} insetChildren={true} task={task}/>)
                })
}
                {divider}
                {habits.map(function(habit, index) {
                    let leftIcon = null
                    if (index === 0) {
                        leftIcon = habitIcon
                    }
                    return (<HabitItem className="todo-item" key={index} leftIcon={leftIcon} insetChildren={true} habit={habit}/>)
                })
}
                {this.props.children}
            </List>
        )
    }
}

ToDoList.propTypes = {
    // A dictionary of task
    tasks: React.PropTypes.any.isRequired
}
