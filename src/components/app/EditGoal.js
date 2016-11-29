// @flow
import React from 'react';
import {connect} from 'react-redux';
import DocumentTitle from 'react-document-title';

import { browserHistory } from 'react-router';

import Layout from '../utils/CustomResponsiveLayout'
import {goalEdit} from '../layout';

import GoalEditorCard from '../goal/creator/GoalEditorCard';
// TODO: invalidate editing if the user is not the correct user
class _EditGoal extends React.Component{
    getTitle = ()=>{
        return "Donit - " + this.props.goal.name;
    }
    onEdit =()=>{
        browserHistory.push("/"+this.props.userId);
    }
    render(){
        return <DocumentTitle title={this.getTitle()}>
            <Layout layout={goalEdit}>
                <div key="editorCard">
                    <GoalEditorCard originalGoal={this.props.goal} navigate={this.onEdit}/>
                </div>
            </Layout>
        </DocumentTitle>
    }
}

_EditGoal.propTypes = {
    goal: React.PropTypes.object.isRequired,
}

const mapStateToProps = (rootReducer,props) =>{
    return {
        userId: rootReducer.userService.userId,
        goal: rootReducer.goalTracking.goals[props.params.goalId],
    }
}

export default connect(mapStateToProps)(_EditGoal);
