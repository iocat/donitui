import React from 'react';
import { connect } from 'react-redux';
import {getGoalFilter} from '../../../reducers/Root';
import {ActionCreators} from '../../../actions';

import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvStop from 'material-ui/svg-icons/av/stop';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import IconButton from 'material-ui/IconButton';
import {getGoalStatusColor} from '../../styles/colors';
import {GoalStatus, StatusFilter} from '../../../data/index';

import {grey500 as grey} from 'material-ui/styles/colors';

class _FilterTab extends React.Component {
    filterByAll = () => {
        if (this.props.filter.byStatuses === StatusFilter.ALL){return;}
        this.props.filterBy(StatusFilter.ALL);
    }
    filterByDone = () => {
        if (this.props.filter.byStatuses === StatusFilter.DONE){return;}
        this.props.filterBy(StatusFilter.DONE);
    }
    filterByNotDone = () => {
        if (this.props.filter.byStatuses === StatusFilter.NOT_DONE){return;}
        this.props.filterBy(StatusFilter.NOT_DONE);
    }
    filterByInProgress = () => {
        if (this.props.filter.byStatuses === StatusFilter.IN_PROGESS){return;}
        this.props.filterBy(StatusFilter.IN_PROGESS);
    }
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
                <IconButton
                    tooltip="Show all goals"
                    onTouchTap={this.filterByAll}>
                    <NavigationApps/>
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
    return Object.assign({},{
            filter: getGoalFilter(root),
        })
}

function mapDispatchToProps(dispatch){
    return {
        filterBy: (goalStatuses)=>{
            dispatch(ActionCreators.FILTER_GOAL_BY_STATUSES(goalStatuses));
        },
    }
}

const Filter = connect(mapStateToProps, mapDispatchToProps)(_FilterTab);
export default Filter;
