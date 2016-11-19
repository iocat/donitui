import React from 'react';

import { GoalVisibility } from '../../../data/index';
import { TextField, Divider, Card,
    CardHeader, CardText, CardActions, CardMedia, FlatButton} from 'material-ui';
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
    tasks: [],
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
            goal: Object.assign({}, this.state.goal, {tasks:tasks}),
        })
    }

    getButtonsForMode = (mode) =>{
        switch(mode){
            case Mode.CREATE:
                return [<FlatButton key="discard-btn"
                                className="goal-control-action btn"
                                onTouchTap={this.onDiscard}
                                label="Discard"/>,
                        <FlatButton key="create-btn"
                            className="goal-control-action btn"
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
