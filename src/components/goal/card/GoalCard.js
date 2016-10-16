import React from 'react';

import ToDoList from './ToDoList';
import GoalCardHeader from './GoalCardHeader';
import GoalControlBlock from './GoalControlBlock';

import {Card} from 'material-ui/Card';

export default class GoalCard extends React.Component {
    styles() {
        return {
            root: {
                width:"100%",
                minWidth:"300px",
                margin:"4px 4px",
                //minWidth: "425px",
                //maxWidth: "450px",
            }
        }
    }

    render() {
        let goal = this.props.goal;
        let styles = this.styles();
        
        let controlBlock = null;
        if (this.props.canUpdate){
            controlBlock = <GoalControlBlock 
                delete={this.props.deleteGoal} 
                goalName={this.props.goal.name}/>
        }
        return (
            <Card style={styles.root}>
                <GoalCardHeader canUpdate={this.props.canUpdate} goal={goal}/>
                <ToDoList tasks={goal.tasks}/>
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
};

GoalCard.propTypes = {
    canUpdate: React.PropTypes.bool.isRequired,
    deleteGoal: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
};