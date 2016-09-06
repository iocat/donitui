import React from 'react';
import Avatar from 'material-ui/Avatar';

export default class UserAvatar extends React.Component{
	constructor(){
		super()
		this.state = {};
		this.style = {
			boxShadow:"2px 2px 2px rgba(0,0,0,0.5)"
		}
	}
	render() {
		return <Avatar 
			src={this.props.avatar} 
			size={this.props.size} 
			style={this.style} ></Avatar>
	}
}

Avatar.defaultProps = {size: 60}