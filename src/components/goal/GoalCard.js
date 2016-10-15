import React from 'react';


import ToDoList from './ToDoList';
import GoalCardHeader from './GoalCardHeader';
import GoalControlBlock from './GoalControlBlock';

import {Card} from 'material-ui/Card';

export default class GoalCard extends React.Component {
    styles() {
        return {
            root: {
                width: "auto",
                minWidth: "425px",
                maxWidth: "450px",
            }
        }
    }

    render() {
        let goal = this.props.goal;
        let styles = this.styles();
        let todoList = null;
        if (goal.tasks.length > 0) {
            todoList = (<ToDoList tasks={goal.tasks}/>)
        }
        let controlBlock = null;
        if (this.props.canUpdate){
            controlBlock = <GoalControlBlock 
                delete={this.props.deleteGoal} 
                goalName={this.props.goal.name}/>
        }
        return (
            <Card style={styles.root}>
                <GoalCardHeader canUpdate={this.props.canUpdate} goal={goal}/>
                {todoList}
                {controlBlock} 
                </Card>
        )
    }
}

GoalCard.defaultProps = {
    canUpdate: false,
    deleteGoal: null,   // callback to delete the goal
    deleteTask: null,   // callback to delete the task
    goal: {
        name: null,
        description: null,
        img: null,
        tasks: [],
    }
}