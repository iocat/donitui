import React from 'react';

import {ListItem} from 'material-ui/List';
import AvFiberManualRecord from 'material-ui/svg-icons/av/fiber-manual-record';
import {getTaskStatusColor} from '../styles/colors';

export default class TaskItem extends React.Component {
    render() {
        let task = this.props.task
        return <ListItem
            leftIcon={this.props.leftIcon}
            insetChildren={this.props.insetChildren}
            rightIcon={
                <AvFiberManualRecord color={getTaskStatusColor(this.props.task.status)}/>
            }
            primaryText={task.name}
            secondaryText={task.description || "" }/>
    }
}

TaskItem.defaultProps = {
    leftIcon: null,
    insetChildren: false,
    task: {
        name: null,
        description: null,
        status:null
    }
}