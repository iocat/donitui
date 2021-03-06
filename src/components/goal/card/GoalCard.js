import React from 'react';

import ToDoList from './ToDoList';
import GoalCardHeader from './GoalCardHeader';
import FloatingCard from '../../utils/FloatingCard';

export default class GoalCard extends React.Component {

    render() {
        let goal = this.props.goal;
        let controlBlock = null;
        return (
            <div className="goal-card">
                <FloatingCard>
                    <GoalCardHeader canUpdate={this.props.canUpdate} goal={goal} edit={this.props.onEdit} delete={this.props.deleteGoal}/>
                    <ToDoList tasks={goal.tasks} habits={goal.habits}/> {controlBlock}
                </FloatingCard>
            </div>
        )
    }
}

GoalCard.defaultProps = {
    canUpdate: false,
    deleteGoal: null, // callback to delete the goal
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
    onEdit: React.PropTypes.func.isRequired,
};
