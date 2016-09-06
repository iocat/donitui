import React from 'react';
import UserAvatar from './UserAvatar';
import StatusNode from './StatusNode';
import {greenA200} from 'material-ui/styles/colors';

export default class UserAvatarWithStatus extends React.Component{

    styles(){
        let size = this.props.size
        let top = (this.props.size/2) * (1- Math.cos(Math.PI/4)) - this.props.radius
        return {
            root: {
                position:"relative",
                width: size,
                height: size
            },
            status: {
                position: "absolute",
                top: top,
                right: top
            }
        }
    }
    render(){
        return (
        <div style={this.styles().root}>
            <UserAvatar 
                avatar={this.props.avatar} 
                size={this.props.size}  />
            <StatusNode 
                status={this.props.status} 
                radius={this.props.radius}
                style={this.styles().status}
                color={this.props.color} />
        </div>
    )}
}

UserAvatarWithStatus.defaultProps = {
    color: greenA200,
    radius: 6,
    size: 70
}