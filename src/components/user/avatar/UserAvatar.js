import React from 'react';
import Avatar from 'material-ui/Avatar';
export default class UserAvatar extends React.Component{
	render() {
		return  <Avatar 
			src={this.props.avatar} 
			size={this.props.size}  ></Avatar>
	}
}

Avatar.defaultProps = {size: 60}