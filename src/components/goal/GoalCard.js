import React from 'react';


import ToDoList from './ToDoList';
import GoalCardHeader from './GoalCardHeader';
import GoalControlBlock from './GoalControlBlock';

import {Card, CardActions} from 'material-ui/Card';

export default class GoalCard extends React.Component {
    styles() {
        return {
            root: {
                position: "relative",
                width: "auto",
                minWidth: "380px",
                maxWidth: "450px",
            }
        }
    }

    render() {
        let goal = this.props.goal
        let styles = this.styles()
        return (
            <Card style={styles.root}>
                <GoalCardHeader goal={goal}/>
                <ToDoList goal={goal}/>
                <GoalControlBlock goal={goal}/>
            </Card>
        )
    }
}

GoalCard.defaultProps = {
    goal: {
        name: null,
        description: null,
        img: null,
        tasks: [],
        habits: []
    }
}