import React from 'react';

import Divider from 'material-ui/Divider';
import TaskItem from './TaskItem' ;
import HabitItem from './HabitItem';
import {List} from 'material-ui/List';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
export default class ToDoList extends React.Component{
    render(){
        let goal = this.props.goal
    return (<List>
        {
            goal.tasks.map(function (task, index) {
                let leftIcon = null
                if (index === 0){
                    leftIcon = <ActionSchedule/>
                }
                return (
                    <TaskItem
                        leftIcon={leftIcon}
                        insetChildren={true}
                        key={task.id}
                        task={task}
                    />
                )}
            )
        }
        <Divider inset={true}/>
        {
            goal.habits.map(function (habit, index) {
                let leftIcon = null
                if (index === 0){
                    leftIcon = <ActionAutorenew/>
                }
                return (
                    <HabitItem
                        leftIcon={leftIcon}
                        insetChildren={true}
                        key={habit.id}
                        habit={habit}
                    />
                )}
            )
        }
        </List>)
    }
}