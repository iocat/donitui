import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
const GoalTrackingLayout = WidthProvider(Responsive);

import { goalTracking, layouts, cols, breakpoints } from '../layout';
import { FilterWithStore } from './filter/FilterWithStore';
import GoalCard from './card/GoalCard';
import EmptyCard from './card/EmptyCard';

export default class GoalTracking extends React.Component {

    renderGoalList = (goals) => {
        let deleteGoal = this.props.deleteGoal;
        let deleteTask = this.props.deleteTaskFromGoal;
        if (goals.length === 0) {
            return <EmptyCard/>
        }
        return goals.map((goal) => {
            return (
                <div key={goal.id}>
                    <GoalCard goal={goal}
                        canUpdate={true}
                        deleteGoal={() => { deleteGoal(goal.id); } }
                        deleteTask={(tid) => { deleteTask(goal.id, tid) } } />
                    <br />
                </div>
            )
        });
    }
    render() {
        let goals = this.props.goals;

        return (
            <GoalTrackingLayout
                rowHeight={70}
                layouts={layouts(goalTracking)}
                breakpoints={breakpoints(goalTracking)}
                cols={cols(goalTracking)}>
                <div key="filter" style={{ textAlign: "right" }}>
                    <FilterWithStore />
                </div>
                <div key="goals" >
                    {
                        this.renderGoalList(goals)
                    }
                </div>
            </GoalTrackingLayout>)
    }
}

GoalTracking.defaultProps = {
    canUpdate: false,
}

GoalTracking.propTypes = {
    // List of goals
    goals: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    // Whether can edit the data or not, allowed editing.
    canUpdate: React.PropTypes.bool,
    // Callbacks
    deleteGoal: React.PropTypes.func.isRequired,
    deleteTaskFromGoal: React.PropTypes.func.isRequired,
}