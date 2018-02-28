// GoalCreatorCard creates a new goal based on the current userid
// and the received goal
import type {Goal} from '../../../data/types';

import {connect} from 'react-redux';
import GoalEditor from './GoalEditor';
import {createGoal} from '../../../reducers/thunks';
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
        accept: (goal) => {dispatch(createGoal(goal))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalEditor);
