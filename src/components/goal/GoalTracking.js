import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions/index';
import {getUserGoals, getGoalFilter} from '../../reducers/Root';

import { Responsive, WidthProvider } from 'react-grid-layout';
const GoalTrackingLayout = WidthProvider(Responsive);

import { goalTracking, layouts, cols, breakpoints } from '../layout';
import { Filter } from './filter/Filter';
import GoalCard from './card/GoalCard';
import EmptyCard from './card/EmptyCard';

class _GoalTracking extends React.Component {
    renderGoalList = (goals, gids) => {
        let deleteGoal = this.props.deleteGoal;
        let deleteTask = this.props.deleteTaskFromGoal;
        if (gids.length === 0) {
            return <EmptyCard/>
        }
        return gids.map((gid) => {
            if (goals[gid]){ // Don't show if the goal does not exist
                return (     
                    <div key={gid}>
                        <GoalCard goal={goals[gid]}
                            canUpdate={true}
                            deleteGoal={() => { deleteGoal(gid); } }
                            deleteTask={(tid) => { deleteTask(gid, tid) } } />
                        <br/>
                    </div>
                )
            }
            return null;
        });
    }
    /* TODO: abstract the goal list into a React object*/
    render() {
        let goals = this.props.goals;
        let gids = this.props.gids;
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
                        this.renderGoalList(goals, gids)
                    }
                </div>
            </GoalTrackingLayout>)
    }
}

_GoalTracking.defaultProps = {
    canUpdate: false,
}

_GoalTracking.propTypes = {
    // Dictionary of goals
    goals: React.PropTypes.object.isRequired,
    // A list of id to render
    gids: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,

    // Whether can edit the data or not, allowed editing.
    canUpdate: React.PropTypes.bool,
    // Callbacks
    deleteGoal: React.PropTypes.func.isRequired,
    deleteTaskFromGoal: React.PropTypes.func.isRequired,
}

function mapStateToProps(root) {
    let goals = getUserGoals(root);
    let filter = getGoalFilter(root);
    return Object.assign({},{
        goals: goals,
        gids: filter.gids,
    })
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