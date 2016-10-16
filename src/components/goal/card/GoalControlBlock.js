import React from 'react';

import {CardActions} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class GoalControlBlock extends React.Component {
    constructor(){
        super();
        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render() {
        let deleteG = this.props.delete;
        let dialogActions = [
            <FlatButton
                label="CANCEL"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="DELETE"
                secondary={true}
                onTouchTap={()=>{this.handleClose(); deleteG();}}
            />
        ]
        return (
            <CardActions style={{ textAlign: "right" }}>
                <FlatButton onTouchTap={this.handleOpen} label="Delete" secondary={true}
                    style={
                        {
                            width: "10%",
                            display: "inline-block",
                            margin: "auto 1%"
                        }
                    }/>
                <Dialog 
                    actions={dialogActions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                > Are you sure you want to delete "{this.props.goalName}"? </Dialog>
                <FlatButton label="Edit" primary={true}
                    style={
                        {
                            width: "10%",
                            display: "inline-block",
                            margin: "auto 1%"
                        }
                    } />
            </CardActions>
        )
    }
}

GoalControlBlock.defaultProps = {
    goalName: "",
    delete: function(){}, // call back function to delete a goal
}