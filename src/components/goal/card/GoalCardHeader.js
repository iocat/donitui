import React from 'react';
import {CardTitle, CardMedia, IconMenu, MenuItem, IconButton, FlatButton, Dialog} from 'material-ui';
import {GoalVisibility} from '../../../data/index';

import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';


function SettingsIconButton(props){
    return <IconMenu {...props} desktop={true}
        iconButtonElement={<IconButton><NavigationMoreVert/></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        <MenuItem onTouchTap={props.onEdit}   primaryText="Edit"    leftIcon={<ImageEdit/>}/>
        <MenuItem onTouchTap={props.onDelete} primaryText="Delete"  leftIcon={<ActionDelete/>}/>
    </IconMenu>
}

export default class GoalCardHeader extends React.Component{
    constructor(){
        super();
        this.state={
            deletionDialog: false,
        }
    }
    isVisible = () => {
        return this.props.goal.visibility === GoalVisibility.PRIVATE;
    }

    openDeletionDialog = ()=>{
        this.setState({deletionDialog: true});
    }

    closeDeletionDialog = ()=>{
        this.setState({deletionDialog: false});
    }

    getDeletionDialog = () =>{
        return <Dialog
            actions={[
            <FlatButton
                label="CANCEL"
                primary={true}
                onTouchTap={this.closeDeletionDialog}
            />,
            <FlatButton
                label="DELETE"
                secondary={true}
                onTouchTap={()=>{this.closeDeletionDialog(); this.props.delete();}}
            />
            ]}
            modal={false}
            open={this.state.deletionDialog}
            onRequestClose={this.closeDeletionDialog}
        > Are you sure you want to delete "{this.props.goal.name}"? </Dialog>
    }

    getSettings = () =>{
        if (this.props.canUpdate){
            return(
                <div className="settings-menu">
                    <SettingsIconButton onEdit={this.props.edit} onDelete={this.openDeletionDialog}/>
                    </div>);
        }
        return null;
    }
    /* TODO: set the states of visibility
        create a drop down list for buttons
        Decouple Checkbox button!*/
    render(){
        let goal = this.props.goal;
        let settings = this.getSettings();
        let cardTitle = (<CardTitle
                    title={goal.name }
                    subtitle={goal.description || ""}
                    className="card-title"></CardTitle>);
        let goalHeader = null;
        if (goal.img){
            goalHeader = <CardMedia className="card-header" overlay={cardTitle}>
                        <div style={{backgroundImage: 'url('+goal.img+')'}} className="header-img"/>
                        </CardMedia>
        }else{
            goalHeader = cardTitle;
        }
        return <div className="card-header">{goalHeader}{settings}{this.getDeletionDialog()}</div>;
    }
}

GoalCardHeader.defaultProps = {
    canUpdate: false,
}

GoalCardHeader.propTypes={
    goal: React.PropTypes.object.isRequired,
    canUpdate: React.PropTypes.bool,
    delete: React.PropTypes.func,
}
