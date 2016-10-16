import React from 'react';
import { connect } from 'react-redux';
import {getGoalFilter} from '../../../reducers/Root';
import {ActionCreators} from '../../../actions/index';

import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvStop from 'material-ui/svg-icons/av/stop';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import IconButton from 'material-ui/IconButton';
import {getGoalStatusColor} from '../../styles/colors';
import {GoalStatus} from '../../../data/index';

import {grey500 as grey} from 'material-ui/styles/colors';

const FILTER_ALL = {
    [GoalStatus.DONE]: true,
    [GoalStatus.NOT_DONE]: true,
    [GoalStatus.IN_PROGRESS]: true,
};

const FILTER_DONE = {
    [GoalStatus.DONE]: true,
};

const FILTER_NOT_DONE = {
    [GoalStatus.NOT_DONE]: true,
};

const FILTER_IN_PROGESS = {
    [GoalStatus.IN_PROGRESS]: true,
};


class _FilterTab extends React.Component {
    filterByAll = () => {this.props.filterBy(FILTER_ALL)}
    filterByDone = () => {this.props.filterBy(FILTER_DONE)}
    filterByNotDone = () => {this.props.filterBy(FILTER_NOT_DONE)}
    filterByInProgress = () => {this.props.filterBy(FILTER_IN_PROGESS)}
    color = (status)=>{
        let currStat = this.props.filter.byStatuses;
        if (currStat[status]){
            return getGoalStatusColor(status);
        }
        return grey;
    }

    render() {
        return (
            <div>
                <IconButton 
                    tooltip="Show all goals"
                    onTouchTap={this.filterByAll}> 
                    <NavigationApps/>
                    </IconButton>

                <IconButton 
                    tooltip="Show active goals" 
                    onTouchTap={this.filterByInProgress}> 
                    <AvPlayArrow color={this.color(GoalStatus.IN_PROGRESS)}/>
                    </IconButton>

                <IconButton 
                    tooltip="Show on-going goals"
                    onTouchTap={this.filterByNotDone}> 
                    <AvPause color={this.color(GoalStatus.NOT_DONE)}/>
                    </IconButton>

                <IconButton 
                    tooltip="Show achieved goals"
                    onTouchTap={this.filterByDone}> 
                    <AvStop color={this.color(GoalStatus.DONE)}/>
                    </IconButton>
            </div>
        )
    }
}

_FilterTab.defaultProps = {}
_FilterTab.propTypes = {
    // The status filter objectOf
    filter: React.PropTypes.shape(
        {
            byStatuses: React.PropTypes.objectOf(React.PropTypes.bool).isRequired,
        }
    ).isRequired,
    // The registered call back 
    filterBy: React.PropTypes.func.isRequired,
}


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

export const Filter = connect(mapStateToProps, mapDispatchToProps)(_FilterTab);