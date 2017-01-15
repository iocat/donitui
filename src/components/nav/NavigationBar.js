// @flow

import React from 'react';
import { AppBar, ToolbarGroup } from 'material-ui';
import {connect} from 'react-redux';
import HistoryController from '../history/HistoryController';
import linkTo from '../../routing/linkTo';

type Props = {
    appName: string,
    toHomePage: ()=> void,
}

class _NavigationBar extends React.Component {
    props: Props
    render(){
        return <AppBar title={this.props.appName} onTitleTouchTap={this.props.toHomePage}>
            <ToolbarGroup className="nav-tools">
                <HistoryController/>
            </ToolbarGroup>
        </AppBar>
    }
}

_NavigationBar.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

_NavigationBar.propTypes = {
    appName: React.PropTypes.string.isRequired,
    toHomePage: React.PropTypes.func.isRequired,
}

const mapStateToProps = (root) =>{
    let tohp = null;
    if (root.userService.signedIn){
        tohp = linkTo.PERSONAL_TRACKING_VIEW(root.userService.username,true)
    }else{
        tohp = linkTo.APP_ROOT(true)
    }
    return {
        toHomePage: tohp,
        appName: "Donit",
    }
}

export default connect(mapStateToProps)(_NavigationBar)
