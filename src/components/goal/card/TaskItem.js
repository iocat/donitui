// @flow
import React from 'react';

import {ListItem} from 'material-ui';
import type { Task } from '../../../data/types';
import {formatDateAndTime, readableDuration} from '../../../timeutils';
import StatusNode from '../StatusNode';

export default class TaskItem extends React.Component {
    getTaskDescription = ()=>{
        let task: Task = this.props.task;
        return <p>
            For {readableDuration(task.duration*1000)}, {formatDateAndTime(task.remindAt)}
        </p>
    }

    render() {
        let task = this.props.task
        let disabled = true;
        if (this.props.onTouchTap){
            disabled = false;
        }
        return <ListItem
            onTouchTap={this.props.onTouchTap}
            leftIcon={this.props.leftIcon}
            insetChildren={this.props.insetChildren}
            rightIconButton={<StatusNode status={task.status}/>}
            disabled={disabled}
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
