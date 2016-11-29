var React = require("react");
import {ListItem, Avatar} from 'material-ui';

export default class HeaderWithIcon extends React.Component{
    render(){
        return <ListItem disabled={true}
                leftAvatar={<Avatar icon={this.props.icon} backgroundColor={this.context.muiTheme.palette.primary1Color} size={35} />} >
                {this.props.title}
        </ListItem>
    }
}

HeaderWithIcon.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

HeaderWithIcon.propTypes = {
    icon: React.PropTypes.node.isRequired,
    title: React.PropTypes.string.isRequired,
}
