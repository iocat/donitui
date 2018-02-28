import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {ActionCreators} from '../../actions';

import {Responsive, WidthProvider} from 'react-grid-layout';
const GoalListLayout = WidthProvider(Responsive);

import {goalTracking, layouts, cols, breakpoints} from '../layout';
import GoalCardList from './card/GoalCardList';
import GoalCreatorCard from './creator/GoalCreatorCard';
import linkTo from '../../routing/linkTo';
import { RaisedButton } from 'material-ui';

class _GoalFiltering extends React.Component {
    // TODO move this call back upward the component tree
    // REASON: it's non of this component's business
    onEdit = (goalId) =>{
        linkTo.EDIT_GOAL_VIEW(this.props.userId, goalId, false)();
    }

    constructor(){
        super()
        this.state = {
            createGoalDialog: false
        }
    }

    render() {
        let goals = this.props.goals;
        let gids = this.props.gids;
        let canUpdate = this.props.canUpdate;
        let deleteGoal = this.props.deleteGoal;
        let deleteTask = this.props.deleteTaskFromGoal;
        let creator = null;
        if(this.state.createGoalDialog){
            creator = <GoalCreatorCard discard={()=>this.setState({createGoalDialog:false})} acceptCallback={()=>this.setState({createGoalDialog:false})}/>
        }else{
            creator = <RaisedButton fullWidth={true} label="Create A Goal" onTouchTap={()=>this.setState({createGoalDialog:true})}></RaisedButton>
        }
        return (
            <GoalListLayout rowHeight={70} layouts={layouts(goalTracking)} breakpoints={breakpoints(goalTracking)} cols={cols(goalTracking)}>
                <div key="goals">
                    {creator}
                    <br/>
                    <br/>
                    <GoalCardList goals={goals} gids={gids} deleteGoal={deleteGoal} deleteTask={deleteTask} canUpdate={canUpdate} onEdit={this.onEdit}/>
                </div>
            </GoalListLayout>
        )
    }
}

_GoalFiltering.propTypes = {
    // Dictionary of goals
    goals: React.PropTypes.object.isRequired,
    // A list of id to render
    gids: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,

    // Whether can edit the data or not, allowed editing.
    canUpdate: React.PropTypes.bool.isRequired,
    // Callbacks
    deleteGoal: React.PropTypes.func,
    deleteTaskFromGoal: React.PropTypes.func
}

function mapStateToProps(root) {
    return {
        goals: root.goalTracking.goals,
        gids: root.goalTracking.filter.gids,
        userId: root.userService.userId,
    };
}

function mapDispatchToProps(dispatchfn) {
    return {
        deleteGoal: (id) => {
            dispatchfn(ActionCreators.DELETE_GOAL(id));
        },
        deleteTaskFromGoal: (goalid, taskid) => {
            dispatchfn(ActionCreators.DELETE_TASK(goalid, taskid));
        }
    }
}

let GoalFiltering = connect(mapStateToProps, mapDispatchToProps)(_GoalFiltering);
export default GoalFiltering;
