// @flow
import React from 'react';
import {ListItem} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class TaskAddButton extends React.Component{
    render(){
        return <ListItem
                    style={{textAlign: "center", backgroundColor: this.context.muiTheme.palette.primary1Color }}
                    primaryText={<ContentAdd color={"white"} />} onTouchTap={this.props.onTouchTap}/>
    }
}

TaskAddButton.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
}
