import React from 'react';

import Divider from 'material-ui/Divider';
import TaskItem from './TaskItem';
import HabitItem from './HabitItem';
import { List } from 'material-ui/List';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
export default class ToDoList extends React.Component {
    habitsAndTasks(tasks) {
        let habits = [];
        let nortasks = []; // Normal tasks
        let tks = Object.keys(tasks);
        tks.forEach(
            (tk) => {
                let task = tasks[tk];
                if (task.reminder) {
                    nortasks.push(task);
                } else if (task.repeatedReminder) {
                    habits.push(task);
                }
            }
        )
        return {
            habits: habits,
            tasks: nortasks,
        }
    }
    render() {
        let sep = this.habitsAndTasks(this.props.tasks);
        let tasks = sep.tasks;
        let habits = sep.habits;
        let divider = null
        if (tasks.length > 0 && habits.length !== 0) {
            divider = <Divider inset={true} />
        }

        return (<List>
            {
                tasks.map(function (task, index) {
                    let leftIcon = null
                    if (index === 0) {
                        leftIcon = <ActionSchedule />
                    }
                    return (
                        <TaskItem
                            leftIcon={leftIcon} insetChildren={true}
                            key={task.id} task={task}
                            />
                    )
                }
                )
            }
            {divider}
            {
                habits.map(function (habit, index) {
                    let leftIcon = null
                    if (index === 0) {
                        leftIcon = <ActionAutorenew />
                    }
                    return (
                        <HabitItem
                            leftIcon={leftIcon} insetChildren={true}
                            key={habit.id} habit={habit}
                            />
                    )
                }
                )
            }
        </List>)
    }
}

ToDoList.propTypes = {
    // A dictionary of task
    tasks: React.PropTypes.object.isRequired,
}