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
        let deleteG = this.props.delete,
            dialogActions = [
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
        ];
        return (
            <CardActions className="goal-actions">
                <FlatButton
                    onTouchTap={this.handleOpen}
                    label="Delete"
                    className="goal-control-action btn"
                    />
                <Dialog
                    actions={dialogActions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                > Are you sure you want to delete "{this.props.goalName}"? </Dialog>

                <FlatButton
                    label="Edit"
                    onTouchTap={this.props.onEdit}
                    primary={true}
                    className="goal-control-action btn"/>
            </CardActions>
        )
    }
}

GoalControlBlock.defaultProps = {
    goalName: "",
    delete: function(){}, // call back function to delete a goal
    onEdit: function(){},
}
