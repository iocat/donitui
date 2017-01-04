import { connect } from 'react-redux';

import type {Goal} from '../../../data/types';

import GoalEditor from './GoalEditor';
import { replaceGoal } from '../../../reducers/thunks/goalTracking';
import initGoal from './initGoal';

const mapStateToProps = (rootReducer, props) =>{
    return {
        initGoal: initGoal(props.originalGoal),
        acceptLabel: "Update",
        title: "Edit \""+ props.originalGoal.name + "\"",
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        accept: (goal: Goal) => {
            dispatch(replaceGoal(goal.id, goal));
            ownProps.navigate();
        },
        discard: () =>{
            ownProps.navigate();
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalEditor);
