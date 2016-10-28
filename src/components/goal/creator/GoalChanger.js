import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText, CardActions, CardMedia } from 'material-ui/Card';
import {GoalVisibility} from '../../../data/index';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TaskCreator from './TaskCreator';

export const Mode = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
}

const EMPTY_GOAL = {
    name:"",
    description:"",
    img:"",
    visibility: GoalVisibility.PRIVATE,
    tasks: [{
        id: 1,
        name:"Demo task: remove later",
        description:"Import thing needs to be done",
        repeatedReminder:{},
    },{
        id: 2,
        name:"Task 2",
        description: "Nothinggggg",
        reminder:{},
    }],
}

export class GoalChanger extends React.Component{
    constructor(props){
        super(props);
        if (props.mode === Mode.CREATE) {
            this.state = {
                goal: EMPTY_GOAL,
                expanded: props.initiallyExpanded,
            }
        }else if (props.mode === Mode.UPDATE){
            this.state = {
                goal: props.originalGoal,
                expanded: props.initiallyExpanded,
            }
        }
    }
    // onDiscard closes the GoalCreator tab
    onDiscard = ()=>{
        this.setState({
            goal: EMPTY_GOAL,
            expanded: false,
        })
    }
    // onExpand opens the GoalCreator tab
    onExpand = () => {
        this.setState({
            expanded: true,
        })
    }
    // handleExpandChange opens and closes the GoalCreator 
    handleExpandChange = (expanded) => {
        this.setState({
            expanded: expanded,
        })
    }
    // changeFieldVal returns the function that changes a field name
    changeFieldVal(fieldName) {
        return (event)=>{
            let val = event.target.value;
            this.setState({
                goal: Object.assign({},this.state.goal, {[fieldName]: val}),
            })
        }
    }
    changeVisibility = (event, index ,val)=>{
        this.setState({
            goal: Object.assign({}, this.state.goal, {visibility: val}),
        });
    }
    // check if this goal is discardable or not
    discardable = ()=>{
        if (this.state.goal === EMPTY_GOAL){
            return true;
        }
        return false;
    }
    // check for valid name
    validName = ()=>{
        return this.state.goal.name !== "";
    }
    // check for valid goal descriptions
    validDesc = () =>{
        return this.state.goal.description !== "";
    }
    // check if this goal is a valid goal or not
    canCreate = ()=>{
        if (this.props.mode === Mode.CREATE && this.state.goal === EMPTY_GOAL){
            return false;
        }
        if(!this.validName() || !this.validDesc() ){
            return false;
        }
        return true;
    }

    addTask = (task)=>{
        let tasks = this.state.goal.tasks.slice();
        tasks.push(task);
        this.setState({
            goal: Object.assign({}, this.state.goal,{tasks:tasks}),
        })
    }
    getButtonsForMode = (mode) =>{
        switch(mode){
            case Mode.CREATE:
                return [ <FlatButton key="discard-btn"
                                className="goal-control-action btn"
                                onTouchTap={this.onDiscard}
                                disabled={this.discardable()}
                                label="Discard"/>,
                            <FlatButton key="create-btn"
                                className="goal-control-action btn" 
                                disabled={!this.canCreate()}
                                primary={true} label="Create"/>
                            ];
            case Mode.UPDATE:
                return [<FlatButton key="update-btn"
                            className="goal-control-action btn"
                            primary={true}  label="Update" />,
                         <FlatButton key="discard-btn" 
                            className="goal-control-action btn"
                            secondary={true} label="Discard"/>];
            default:
                console.log("ERROR: unexpected Mode, got " + mode);
        }
    }
    render(){
        let mode = this.props.mode;
        let goal = this.state.goal;
        let buttons = this.getButtonsForMode(mode);
        return (
            <Card expanded={this.state.expanded} 
                className="goal-card goal-changer" 
                onExpandChange={this.handleExpandChange}>
                <CardHeader actAsExpander={true} 
                    showExpandableButton={true}
                    subtitle="Got something cool to do today?"/>
                <Divider/>
                <CardText expandable={true}>
                    <TextField
                        hintText="What do you want to do?"
                        floatingLabelText="Objective" floatingLabelFixed={true}
                        fullWidth={true} value={goal.name}
                        onChange={this.changeFieldVal("name")}/>
                    <TextField
                        hintText="Add some more details?" floatingLabelFixed={true}
                        floatingLabelText="Description" fullWidth={true}
                        multiLine={true} value={goal.description}
                        onChange={this.changeFieldVal("description")}/>
                    <SelectField
                        autoWidth={true}
                        floatingLabelText="Who can see it?"
                        value={goal.visibility}
                        onChange={this.changeVisibility}>
                        <MenuItem 
                            value={GoalVisibility.FOR_FOLLOWERS} 
                            label="Followers"
                            primaryText="Followers"/>
                        <MenuItem 
                            value={GoalVisibility.PUBLIC} 
                            label="Everyone"
                            primaryText="Everyone"/>
                        <MenuItem 
                            value={GoalVisibility.PRIVATE}
                            label="Only You"
                            primaryText="You"/>
                        </SelectField>
                    </CardText>
                <Divider/>      
                <CardMedia expandable={true}>
                    <TaskCreator tasks={this.state.goal.tasks} addTask={this.addTask}/>
                    </CardMedia>

                <CardActions className="goal-actions" expandable={true}>
                    {buttons}
                    </CardActions>
                </Card>
        )
    }
}

GoalChanger.defaultProps = {
    initiallyExpanded: false,
}

GoalChanger.propTypes = {
    // the mode of the changer object
    mode: React.PropTypes.oneOf([Mode.CREATE, Mode.UPDATE]).isRequired,
    initiallyExpanded: React.PropTypes.bool.isRequired,

    onCreateGoal: React.PropTypes.func,

    originalGoal: React.PropTypes.object,
    onDiscardChanges: React.PropTypes.func,
    onUpdateChanges: React.PropTypes.func,
}