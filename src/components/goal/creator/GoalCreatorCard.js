// GoalCreatorCard creates a new goal based on the current userid
// and the received goal
import type {Goal} from '../../../data/types';

import {connect} from 'react-redux';
import GoalChanger from './GoalChanger';
import { createGoal } from '../../../reducers/thunks/goalTracking';
import initGoal from './initGoal';

const mapStateToProps = (root) => {
    return {
        originalGoal: initGoal(null),
        acceptLabel: "Create",
        discardLabel: "Discard",
        allowExpandHeader: true,
        initiallyExpanded: false,
        expandHeaderText: "Create a goal",
        userId: root.userService.userId,
    }
}

const mapDispatchToProps= (dispatch) =>{
    return {
        onGoalAccepted:(userId, goal)=> dispatch(createGoal(userId, goal)),
    }
}

const mergeProps = (stateP, dispaP, ownProps) =>{
    return Object.assign({}, ownProps, stateP,{
        onGoalAccepted:(goal: Goal) => dispaP.onGoalAccepted(stateP.userId, goal),
    })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GoalChanger);
