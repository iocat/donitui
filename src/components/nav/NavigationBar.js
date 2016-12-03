// @flow

import React from 'react';
import { AppBar, ToolbarGroup } from 'material-ui';
import {connect} from 'react-redux';
import HistoryController from '../history/HistoryController';

type Props = {
    appName: string,
    toHomePage: ()=> void,
}

class _NavigationBar extends React.Component {
    props: Props
    render(){
        return <AppBar title={this.props.appName} onTitleTouchTap={this.props.toHomePage()}>
            <ToolbarGroup>
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
    return {
        appName: "Donit",

    }
}

const mapDispatchToProps = (root) => {
    return {
        // TODO
        toHomePage: () => console.error("return to homepage"),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(_NavigationBar)
