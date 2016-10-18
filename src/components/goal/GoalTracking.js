import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions/index';
import {getUserGoals, getGoalFilter} from '../../reducers/Root';

import { Responsive, WidthProvider } from 'react-grid-layout';
const GoalTrackingLayout = WidthProvider(Responsive);

import { goalTracking, layouts, cols, breakpoints } from '../layout';
import Filter from './filter/Filter';
import GoalCardList from './card/GoalCardList';
import GoalCreator from './creator/GoalCreator';


import RaisedButton from 'material-ui/RaisedButton';

class GoalTrackingController extends React.Component{
    render(){
        return (
            <div style={{textAlign:"right"}}> 
                <Filter  />
            </div>
        )
    }
}

class _GoalTracking extends React.Component {
    render() {
        let goals = this.props.goals;
        let gids = this.props.gids;
        let canUpdate = this.props.canUpdate;
        let deleteGoal = this.props.deleteGoal;
        let deleteTask = this.props.deleteTaskFromGoal;
        return (
            <GoalTrackingLayout
                rowHeight={70}
                layouts={layouts(goalTracking)}
                breakpoints={breakpoints(goalTracking)}
                cols={cols(goalTracking)}>
                <div key="filter" >
                    <GoalTrackingController/>
                    </div>
                <div key="goals" >
                    <GoalCardList goals={goals} gids={gids} deleteGoal={ deleteGoal }
                        deleteTask={ deleteTask } canUpdate={canUpdate}/>
                    </div>
                </GoalTrackingLayout>)
    }
}

_GoalTracking.propTypes = {
    // Dictionary of goals
    goals: React.PropTypes.object.isRequired,
    // A list of id to render
    gids: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,

    // Whether can edit the data or not, allowed editing.
    canUpdate: React.PropTypes.bool.isRequired,
    // Callbacks
    deleteGoal: React.PropTypes.func,
    deleteTaskFromGoal: React.PropTypes.func,
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

let GoalTracking = connect(mapStateToProps, mapDispatchToProps)(_GoalTracking);
export default GoalTracking;