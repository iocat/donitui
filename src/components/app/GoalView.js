// @flow
import React from 'react';

import { goalView } from '../layout';
import GoalViewLayout from '../utils/CustomResponsiveLayout';
import DocumentTitle from 'react-document-title';
import GoalCard from '../goal/card/GoalCard';
import {connect} from 'react-redux';

import type { Goal } from '../../data/types';
import type { RootReducer } from '../../data/reducers';

import { userCheck } from './proxyDecorator';
import { deleteGoal } from '../../reducers/thunks/goalTracking';


class _GoalView extends React.Component{
    getTitle = ()=>{
        return this.props.goal.name
    }
    render(){
        let props: any = this.props;
        return <DocumentTitle title={this.getTitle()}>
            <GoalViewLayout layout={goalView}>
                <div key="goal">
                    <GoalCard {...props} />
                </div>
            </GoalViewLayout>
        </DocumentTitle>
    }
    props: {
        goal: Goal,
        ownerId: string,
        userId: string,
    }
}

_GoalView.propTypes = {
    goal: React.PropTypes.object.isRequired,
}

function mapStateToProps(root: RootReducer, props: any){
    let ownerId: string = props.params.userId,
        userId: number =  root.userService.userId,
        goalId: number = props.params.goalId,
        canUpdate: boolean = false,
        goal: ?Goal = null;
    if(ownerId === userId){
        goal = root.goalTracking.goals[goalId];
        canUpdate = true;
    }
    return{
        goal: goal,
        userId: userId,
        ownerId: ownerId,
        canUpdate: canUpdate,
    }
}

function mapDispatchToProps(dispatch: any){
    return {
        dispatch: dispatch
    }
}

import { browserHistory } from 'react-router';

function mergeProps(state, dispatch, ownProps){
    return Object.assign({}, state, ownProps, {
        onEdit: ()=> browserHistory.push("/"+state.ownerId+"/goals/"+state.goal.id+"/edit"),
        deleteGoal: ()=> {
            dispatch.dispatch(deleteGoal(state.ownerId, state.goal.id))
            browserHistory.replace("/"+state.ownerId+"/goals");
        },
    })
}

export default connect(userCheck(mapStateToProps), mapDispatchToProps, mergeProps)(_GoalView);
