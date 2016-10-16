import { connect } from 'react-redux';
import FilterTab from './FilterTab';
import {getGoalFilter} from '../../../reducers/Root';
import {ActionCreators} from '../../../actions/index';

function mapStateToProps(root){
    return{
        filter: getGoalFilter(root),
    }
}

function mapDispatchToProps(dispatch){
    return {
        filterBy: (goalStatuses)=>{
            dispatch(ActionCreators.FILTER_GOAL_BY_STATUSES(goalStatuses));
        },
    }
}

export const FilterWithStore = connect(mapStateToProps, mapDispatchToProps)(FilterTab);