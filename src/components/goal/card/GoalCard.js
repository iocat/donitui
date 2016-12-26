import React from 'react';

import ToDoList from './ToDoList';
import GoalCardHeader from './GoalCardHeader';
import GoalControlBlock from './GoalControlBlock';
import FloatingCard from '../../utils/FloatingCard';

export default class GoalCard extends React.Component {

    render() {
        let goal = this.props.goal;
        let controlBlock = null;
        return (
            <div className="goal-card">
                <FloatingCard>
                    <GoalCardHeader canUpdate={this.props.canUpdate} goal={goal} edit={this.props.onEdit} delete={this.props.deleteGoal}/>
                    <ToDoList tasks={goal.tasks}/> {controlBlock}
                </FloatingCard>
            </div>
        )
    }
}

GoalCard.defaultProps = {
    canUpdate: false,
    deleteGoal: null, // callback to delete the goal
    deleteTask: null, // callback to delete the task
    goal: {
        name: null,
        description: null,
        img: null,
        tasks: []
    }
};

GoalCard.propTypes = {
    canUpdate: React.PropTypes.bool.isRequired,
    deleteGoal: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired
};
