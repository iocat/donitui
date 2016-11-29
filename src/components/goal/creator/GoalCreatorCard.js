import type {Goal} from '../../../data/types';


import {connect} from 'react-redux';
import GoalChanger from './GoalChanger';
import { createGoal } from '../../../reducers/thunks/goalTracking';
import initGoal from './initGoal';

const mapStateToProps = (rootReducer) => {
    return {
        originalGoal: initGoal(null),
        acceptLabel: "Create",
        discardLabel: "Discard",
        allowExpandHeader: true,
        initiallyExpanded: false,
        expandHeaderText: "Create an objective",
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGoalAccepted: (goal: Goal) => {
            dispatch(createGoal(goal));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalChanger);
