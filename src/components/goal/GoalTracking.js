import React from 'react';
import { connect } from 'react-redux';
import { normalizer } from '../../reducers/utils/normalizer';
import { ActionCreators } from '../../actions/index';
import {getUserGoals, getGoalFilter} from '../../reducers/Root';
import {GoalStatus} from '../../data/index';

import { Responsive, WidthProvider } from 'react-grid-layout';
const GoalTrackingLayout = WidthProvider(Responsive);

import { goalTracking, layouts, cols, breakpoints } from '../layout';
import { Filter } from './filter/Filter';
import GoalCard from './card/GoalCard';
import EmptyCard from './card/EmptyCard';

class _GoalTracking extends React.Component {
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
                    <Filter />
                </div>
                <div key="goals" >
                    {
                        this.renderGoalList(goals)
                    }
                </div>
            </GoalTrackingLayout>)
    }
}

_GoalTracking.defaultProps = {
    canUpdate: false,
}

_GoalTracking.propTypes = {
    // List of goals
    goals: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    // Whether can edit the data or not, allowed editing.
    canUpdate: React.PropTypes.bool,
    // Callbacks
    deleteGoal: React.PropTypes.func.isRequired,
    deleteTaskFromGoal: React.PropTypes.func.isRequired,
}

function filterGoals(goals = {}, filterStatus = {}) {
    let normGoals = normalizer(goals, ActionCreators.DENORMALIZE("id"));
    normGoals.forEach((goal, i) => {
        normGoals[i].tasks = normalizer(normGoals[i].tasks, ActionCreators.DENORMALIZE("id"))
    })
    
    if (Object.keys(filterStatus).length === Object.keys(GoalStatus).length){
        return normGoals;
    }
    return normGoals.filter(
        (goal) => {
            if (filterStatus[goal.status]){
                return true;
            }
            return false;
        })
}

function mapStateToProps(root) {
    return {
        goals: filterGoals(getUserGoals(root), getGoalFilter(root).byStatuses),
    }
}

function mapDispatchToProps(dispatchfn){
    return{
        deleteGoal: (id) => {
            dispatchfn(ActionCreators.DELETE_GOAL(id));
        },
        deleteTaskFromGoal: (goalid, taskid) =>{
            dispatchfn(ActionCreators.DELETE_TASK(goalid,taskid));
        },
    }
}

export const GoalTracking = connect(mapStateToProps, mapDispatchToProps)(_GoalTracking);