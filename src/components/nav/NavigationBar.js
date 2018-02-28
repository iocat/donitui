// @flow

import React from 'react';
import { AppBar, ToolbarGroup } from 'material-ui';
import {connect} from 'react-redux';
import HistoryController from '../history/HistoryController';
import linkTo from '../../routing/linkTo';
import LoginButton from '../user/GoogleSignInButton';

type Props = {
    appName: string,
    signedIn: boolean,
    toHomePage: ()=> void,
}

class _NavigationBar extends React.Component {
    props: Props
    getToolbar = ()=>{
        if (this.props.signedIn){
            return <ToolbarGroup className="nav-tools">
                <HistoryController/>
            </ToolbarGroup>
        }else{
            return <ToolbarGroup className="nav-tools">
                <LoginButton/>
            </ToolbarGroup>;
        }
    }

    render(){
        return <AppBar showMenuIconButton={false}
            title={this.props.appName} onTitleTouchTap={this.props.toHomePage}>
            {this.getToolbar()}
        </AppBar>
    }
}

_NavigationBar.propTypes = {
    signedIn: React.PropTypes.bool.isRequired,
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
        signedIn: root.userService.signedIn,
        toHomePage: tohp,
        appName: "Donit",
    }
}

export default connect(mapStateToProps)(_NavigationBar)
