import { connect } from 'react-redux';

import type {Goal} from '../../../data/types';

import GoalChanger from './GoalChanger';
import { replaceGoal } from '../../../reducers/thunks/goalTracking';
import initGoal from './initGoal';

const mapStateToProps = (rootReducer, props) =>{
    return {
        initiallyExpanded: true,
        originalGoal: initGoal(props.originalGoal),
        acceptLabel: "Update",
        discardLabel: "Discard",
        allowExpandHeader: false,
        expandHeaderText: "Edit \""+ props.originalGoal.name + "\"",
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGoalAccepted: (goal: Goal) => {
            dispatch(replaceGoal(goal.id, goal));
            ownProps.navigate();
        },
        onChangeDiscarded: (goal: Goal) =>{
            ownProps.navigate();
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalChanger);
