// @flow
import React from 'react';

import {ListItem} from 'material-ui';
import AvFiberManualRecord from 'material-ui/svg-icons/av/fiber-manual-record';
import {getTaskStatusColor} from '../../styles/colors';
import type {Task, Reminder} from '../../../data/types';
import {formatDateAndTime, readableDuration} from '../../../timeutils';

export default class TaskItem extends React.Component {
    getTaskDescription = ()=>{
        let task: Task = this.props.task;
        let reminder :?Reminder = task.reminder;
        if(reminder != null){
            return <p>
                For {readableDuration(reminder.duration*60000)}, {formatDateAndTime(reminder.remindAt)}
            </p>
        }
        return "";
    }
    render() {
        let task = this.props.task

        let statusCircle = null;
        if (task.status){
            let statusColor = getTaskStatusColor(task.status)
            statusCircle = (<AvFiberManualRecord color={statusColor}/>)
        }
        return <ListItem
            onTouchTap={this.props.onTouchTap}
            leftIcon={this.props.leftIcon}
            insetChildren={this.props.insetChildren}
            rightIcon={statusCircle}
            primaryText={task.name}
            secondaryText={this.getTaskDescription()}/>
    }
    static defaultProps: {
        leftIcon: any,
        insetChildren: boolean,
    }
}

TaskItem.defaultProps = {
    leftIcon: null,
    insetChildren: false,
}

TaskItem.propTypes = {
    onTouchTap: React.PropTypes.func,
    task: React.PropTypes.object.isRequired,
    leftIcon: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
}
