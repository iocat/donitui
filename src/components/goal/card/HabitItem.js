import React from 'react';

import {getTaskStatusColor} from '../../styles/colors';

import {ListItem} from 'material-ui/List';
import AvFiberManualRecord from 'material-ui/svg-icons/av/fiber-manual-record';

export default class HabitItem extends React.Component{
    render(){
        let statusCircle = null;
        if (this.props.habit.status){
            let statusColor = getTaskStatusColor(this.props.habit.status)
            statusCircle = (<AvFiberManualRecord color={statusColor}/>)
        }
        
        return <ListItem
            rightIcon={statusCircle}
            leftIcon={this.props.leftIcon}
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