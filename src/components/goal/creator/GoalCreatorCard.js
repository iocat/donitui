// GoalCreatorCard creates a new goal based on the current userid
// and the received goal
import type {Goal} from '../../../data/types';

import {connect} from 'react-redux';
import GoalEditor from './GoalEditor';
import { createGoal } from '../../../reducers/thunks/goalTracking';
import initGoal from './initGoal';

const mapStateToProps = (root) => {
    return {
        initGoal: initGoal(null),
        acceptLabel: "Create",
        title: "Create a goal",
        userId: root.userService.userId,
    }
}

const mapDispatchToProps= (dispatch) =>{
    return {
        accept:(userId, goal)=> dispatch(createGoal(userId, goal)),
    }
}

const mergeProps = (stateP, dispaP, ownProps) =>{
    return Object.assign({}, ownProps, stateP,{
        accept:(goal: Goal) => {dispaP.accept(stateP.userId, goal); ownProps.acceptCallback()},
    })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GoalEditor);
