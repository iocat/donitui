// @flow
import React from 'react';
import {IconButton, SvgIcon} from 'material-ui';
import {getStatusColor} from '../styles/colors';
import {TaskStatus} from '../../data/index';
const getReadableStatus = (status)=>{
    switch (status) {
        case TaskStatus.DONE:
            return "done";
        case TaskStatus.NOT_DONE:
            return "inactive";
        case TaskStatus.IN_PROGRESS:
            return "active"
        default:
            console.log("unhandled case");
    }
}

const SvgCircle = (props) =>(
    <SvgIcon {...props} >
       <circle cx={0} cy={0} r={props.radius}/>
   </SvgIcon>
)

export default class StatusNode extends React.Component {
    render() {
        return <IconButton {...this.props} tooltip={getReadableStatus(this.props.status) } tooltipPosition="bottom-center">
        <SvgCircle viewBox="-5 -5 10 10" radius={1.8} color={getStatusColor(this.props.status)}/>
    </IconButton>
    }
}
