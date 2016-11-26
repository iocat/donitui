import React from 'react';

import { GoalVisibility } from '../../../data/index';
import { TextField, Divider,
    CardHeader, CardText, CardActions, CardMedia, FlatButton} from 'material-ui';
import TaskCreator from './TaskCreator';
import FloatingCard from '../../utils/FloatingCard';

export const Mode = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
}

const EMPTY_GOAL = {
    name:"",
    description:"",
    img:"",
    visibility: GoalVisibility.PRIVATE,
    tasks: [],
}

export class GoalChanger extends React.Component{
    constructor(props){
        super(props);
        let initGoal: Goal = EMPTY_GOAL;
        switch(props.mode){
            case Mode.CREATE:
                initGoal = EMPTY_GOAL;
                break;
            case Mode.UPDATE:
                initGoal = props.originalGoal
                break;
            default:
                console.error("unhandled case for GoalChanger constructor");
        }
        this.state = {
            goal: initGoal,
            expanded: props.initiallyExpanded,
            changedName: false,
            changedDesc: false,
            modifiedTasks: false,
        }
    }

    // onDiscard closes the GoalCreator tab
    onDiscard = ()=>{
        this.setState({
            goal: EMPTY_GOAL,
            expanded: false,
            changedName: false,
            changedDesc: false,
            modifiedTasks: false,
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

    onChangeDesc = (event: Event) =>{
        let val = event.target.value;
        this.setState({
            goal: Object.assign({}, this.state.goal, {description: val}),
            changedDesc: true,
        })
    }

    onChangeName = (event: Event) => {
        let val = event.target.value;
        this.setState({
            goal: Object.assign({}, this.state.goal, {name: val}),
            changedName: true,
        })
    }

    changeVisibility = (event, index ,val)=>{
        this.setState({
            goal: Object.assign({}, this.state.goal, {visibility: val}),
        });
    }

    replaceTask = (index, task)=>{
        let tasks = this.state.goal.tasks.slice();
        if (index < tasks.length) {
            tasks[index] = task;
        }else if (index === tasks.length){
            tasks.push(task)
        }else if (index > tasks.length){
            console.log("error: index "+ index + "is out of bound");
        }
        this.setState({
            modifiedTasks: true,
            goal: Object.assign({}, this.state.goal, {tasks:tasks}),
        })
    }

    validName = ():boolean =>{
        let name: string = this.state.goal.name;
        return name.length > 0 && name.length <= 60;
    }

    validDesc = ():boolean => {
        let desc: string = this.state.goal.description;
        return desc.length <= 200;
    }

    getNameError = () =>{
        if (this.state.changedName && !this.validName()){
            return "The objective must be between 1 and 60 characters";
        }
        return "";
    }

    getDescError = () =>{
        if(this.state.changedDesc && !this.validDesc()){
            return "The description must be less than 200 characters";
        }
        return "";
    }

    onCreateGoal = ()=>{
        this.setState({
            goal: EMPTY_GOAL,
            expanded: this.props.initiallyExpanded,
            changedName: false,
            changedDesc: false,
            modifiedTasks: false,
        });
        this.props.onCreateGoal(this.state.goal);
    }

    getButtonsForMode = (mode) =>{
        let isCreateDisable = () =>{
            return !this.validName() || !this.validDesc();
        }
        let discardable = ()=>{
            return this.state.modifiedTasks || this.state.changedName || this.state.changedDesc;
        }
        switch(mode){
            case Mode.CREATE:
                return [<FlatButton key="discard-btn"
                                className="goal-control-action btn"
                                onTouchTap={this.onDiscard}
                                disabled={!discardable()}
                                label="Discard"/>,
                        <FlatButton key="create-btn"
                            className="goal-control-action btn"
                            onTouchTap={this.onCreateGoal}
                            disabled={isCreateDisable()}
                            primary={true} label="Create"/>
                        ];
            case Mode.UPDATE:
                // TODO add callbacks
                return [<FlatButton key="update-btn"
                            className="goal-control-action btn"
                            primary={true}  label="Update" />,
                        <FlatButton key="discard-btn"
                            className="goal-control-action btn"
                            onTouchTap={this.onDiscard}
                            disabled={!this.discardable()}
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
            <div className="goal-card goal-changer">
            <FloatingCard expanded={this.state.expanded}
                onExpandChange={this.handleExpandChange}>
                <CardHeader actAsExpander={true}
                    showExpandableButton={true}
                    subtitle="Ready to be awesome? Create a goal..."/>
                <Divider/>
                <CardText expandable={true}>
                    <TextField
                        hintText="What do you want to do?"
                        floatingLabelText="Objective" floatingLabelFixed={true}
                        fullWidth={true} value={goal.name}
                        errorText={this.getNameError()}
                        onChange={this.onChangeName} autoFocus/>
                    <TextField
                        hintText="Add some more details?" floatingLabelFixed={true}
                        floatingLabelText="Description" fullWidth={true}
                        errorText={this.getDescError()}
                        multiLine={true} value={goal.description}
                        onChange={this.onChangeDesc}/>
                    {/*<SelectField
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
                    </SelectField>*/}
                    </CardText>
                <CardMedia expandable={true}>
                    <TaskCreator tasks={this.state.goal.tasks}
                        replaceTask={this.replaceTask}
                        initTask={this.initTask}/>
                    </CardMedia>
                <CardActions className="goal-actions" expandable={true}>
                    {buttons}
                    </CardActions>
                </FloatingCard>
            </div>
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
