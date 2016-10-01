import React from 'react';

import {getHabitStatusColor} from '../styles/colors';

import {ListItem} from 'material-ui/List';
import AvFiberManualRecord from 'material-ui/svg-icons/av/fiber-manual-record';

export default class HabitItem extends React.Component{
    render(){
        let statusColor = getHabitStatusColor(this.props.habit.status)
        return <ListItem
            rightIcon={
                <AvFiberManualRecord color={statusColor}/>
            }
            leftIcon={
                this.props.leftIcon
            }
            insetChildren={this.props.insetChildren}
            primaryText={this.props.habit.name}
            secondaryText={this.props.habit.description || ""}/>
    }
}


HabitItem.defaultProps ={
    leftIcon: null,
    insetChildren: false,
    habit: {
        name: null,
        description: null,
        status:null
    }
}