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
                minWidth: "380px",
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
            controlBlock = <GoalControlBlock goal={goal}/>
        }
        return (
            <Card style={styles.root}>
                <GoalCardHeader goal={goal}/>
                {todoList}
                {controlBlock} 
            </Card>
        )
    }
}

GoalCard.defaultProps = {
    canUpdate: false,
    goal: {
        name: null,
        description: null,
        img: null,
        tasks: [],
    }
}