// @flow
import React from 'react';
import { connect } from 'react-redux';
import {ActionCreators} from '../../../actions';

import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvStop from 'material-ui/svg-icons/av/stop';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import { IconButton }from 'material-ui';
import {getStatusColor} from '../../styles/colors';
import {Status, StatusFilter} from '../../../data/index';

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
        if (this.props.filter.byStatuses === StatusFilter.INACTIVE){return;}
        this.props.filterBy(StatusFilter.INACTIVE);
    }
    filterByInProgress = () => {
        if (this.props.filter.byStatuses === StatusFilter.ACTIVE){return;}
        this.props.filterBy(StatusFilter.ACTIVE);
    }
    color = (status)=>{
        let currStat = this.props.filter.byStatuses;
        if (currStat[status]){
            return getStatusColor(status);
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
                    <AvPlayArrow color={this.color(Status.ACTIVE)}/>
                    </IconButton>
                <IconButton
                    tooltip="Show current goals"
                    onTouchTap={this.filterByNotDone}>
                    <AvPause color={this.color(Status.INACTIVE)}/>
                    </IconButton>
                <IconButton
                    tooltip="Show past goals"
                    onTouchTap={this.filterByDone}>
                    <AvStop color={this.color(Status.DONE)}/>
                    </IconButton>
            </div>
        )
    }
}

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
            filter: root.goalTracking.filter,
        })
}

function mapDispatchToProps(dispatch){
    return {
        filterBy: (goalStatuses)=>{
            dispatch(ActionCreators.FILTER_GOAL_BY_STATUSES(goalStatuses));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(_FilterTab);
