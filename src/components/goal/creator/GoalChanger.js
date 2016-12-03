// @flow
import React from 'react';

import { TextField, Divider, CardText, CardActions, CardMedia, FlatButton} from 'material-ui';
import TaskCreator from './TaskCreator';
import FloatingCard from '../../utils/FloatingCard';
import HeaderWithIcon from '../../utils/HeaderWithIcon';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import EditorInsertInvitation from 'material-ui/svg-icons/editor/insert-invitation';

import type {
    Goal,
    GoalVisibilityEnum,
    Task,
} from '../../../data/types';

type Props = {
    allowExpandHeader: boolean,
    initiallyExpanded: boolean,
    expandHeaderText: string,

    onGoalAccepted: (goal: Goal)=> void,
    onChangeDiscarded: () => void,
    originalGoal: Goal,
    acceptLabel: any,
    discardLabel: any,
}

export default class GoalChanger extends React.Component{
    state: {
        goal: Goal,
        expanded: boolean,
        changedName: boolean,
        changedDesc: boolean,
        modifiedTasks: boolean,
    }

    constructor(props: Props ){
        super(props);
        this.state = {
            goal: props.originalGoal,
            expanded: props.initiallyExpanded,
            changedName: false,
            changedDesc: false,
            modifiedTasks: false,
        }
    }

    // onDiscard closes the GoalCreator tab
    onDiscard = ()=>{
        this.setState({
            goal: this.props.originalGoal,
            expanded: false,
            changedName: false,
            changedDesc: false,
            modifiedTasks: false,
        })
        this.props.onChangeDiscarded();
    }

    // onExpand opens the GoalCreator tab
    onExpand = () => {
        this.setState({
            expanded: true,
        })
    }
    // handleExpandChange opens and closes the GoalCreator
    handleExpandChange = (expanded: boolean) => {
        this.setState({
            expanded: expanded,
        })
    }

    onChangeDesc = (event: any) =>{
        let val = event.target.value;
        this.setState({
            goal: Object.assign({}, this.state.goal, {description: val}),
            changedDesc: true,
        })
    }

    onChangeName = (event: any) => {
        let val = event.target.value;
        this.setState({
            goal: Object.assign({}, this.state.goal, {name: val}),
            changedName: true,
        })
    }

    changeVisibility = (event: Event, index :number ,val: GoalVisibilityEnum )=>{
        this.setState({
            goal: Object.assign({}, this.state.goal, {visibility: val}),
        });
    }

    replaceTask = (index: number, task: Task)=>{
        let tasks = this.state.goal.tasks.slice();
        if (index < tasks.length) {
            tasks[index] = task;
        }else if (index === tasks.length){
            tasks.push(task)
        }else if (index > tasks.length){
            console.error("error: index "+ index + "is out of bound");
        }
        this.setState({
            modifiedTasks: true,
            goal: Object.assign({}, this.state.goal, {tasks:tasks}),
        })
    }

    removeTask = (index: number) =>{
        let tasks = this.state.goal.tasks.slice();
        if (index < tasks.length){
            tasks.splice(index, 1);
        }else{
            console.error("invalid task's index");
        }
        this.setState({
            modifiedTasks: true,
            goal: Object.assign({}, this.state.goal, {tasks: tasks}),
        })
    }

    validTasks = ():boolean => {
        return this.state.goal.tasks.length > 0;
    }

    validName = ():boolean =>{
        let name: string = this.state.goal.name;
        return name.length > 0 && name.length <= 60;
    }

    validDesc = ():boolean => {
        let desc: ?string = this.state.goal.description;
        return !desc || (desc && desc.length <= 200);
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

    getTasksError = ()=>{
        if(this.state.modifiedTasks && this.state.goal.tasks.length === 0){
            return "There should be at least one task or habit for this objective";
        }
        return "";
    }

    onAcceptGoal = ()=>{
        this.setState({
            goal: this.props.originalGoal,
            expanded: this.props.initiallyExpanded,
            changedName: false,
            changedDesc: false,
            modifiedTasks: false,
        });
        this.props.onGoalAccepted(this.state.goal);
    }
    getButtons = () =>{
        let isCreateDisable = () =>{
            if (!this.state.changedName && !this.state.changedDesc && !this.state.modifiedTasks){
                return true;
            }
            return !this.validName() || !this.validDesc() || !this.validTasks();
        }
        let discardable = ()=>{
            return true;
        }
        return [<FlatButton key="discard-btn"
                        className="goal-control-action btn"
                        onTouchTap={this.onDiscard}
                        disabled={!discardable()}
                        label={this.props.discardLabel}/>,
                <FlatButton key="create-btn"
                    className="goal-control-action btn"
                    onTouchTap={this.onAcceptGoal}
                    disabled={isCreateDisable()}
                    primary={true} label={this.props.acceptLabel}/>
                ];
    }
    render() {
    let goal = this.state.goal;
    let buttons = this.getButtons();
    let expandable = this.props.allowExpandHeader;
    let taskErr = this.getTasksError(),
        taskErrMsg = null;
    if (taskErr !== ""){
        taskErrMsg = <CardText style={{color:"red"}}> {taskErr} </CardText>;
    }
    return (
        <div className="goal-card goal-changer">
            <FloatingCard expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <div actAsExpander={expandable} showExpandableButton={expandable}>
                    <HeaderWithIcon icon={<EditorModeEdit/>} title={this.props.expandHeaderText}/></div>
                <Divider/>
                <CardText expandable={expandable}>
                    <TextField hintText="What do you want to do?" floatingLabelText="Goal" floatingLabelFixed={true} fullWidth={true} value={goal.name} errorText={this.getNameError()} onChange={this.onChangeName} />
                    <TextField hintText="Add some more details?" floatingLabelFixed={true} floatingLabelText="Description" fullWidth={true} errorText={this.getDescError()} multiLine={true} value={goal.description} onChange={this.onChangeDesc}/> {/*<SelectField
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
                <CardMedia expandable={expandable}>
                    <div>
                        <HeaderWithIcon icon={<EditorInsertInvitation/>} title={"Habits and Tasks"}/>
                        {taskErrMsg}
                        <Divider/>
                    <TaskCreator tasks={this.state.goal.tasks} replaceTask={this.replaceTask} removeTask={this.removeTask}/>
                    </div>
                </CardMedia>
                <CardActions className="goal-actions" expandable={expandable}>
                    {buttons}
                </CardActions>
            </FloatingCard>
        </div>);
    }
    props: Props
    static defaultProps: {
        discardLabel: any,
        initiallyExpanded: boolean,
        allowExpandHeader: boolean,
        expandHeaderText: string,
    }
}

GoalChanger.defaultProps = {
    discardLabel: "Discard",
    initiallyExpanded: false,
    allowExpandHeader: false,
    expandHeaderText: "Change your goal",
    onChangeDiscarded: ()=>{}, // Do nothing when discarding changes
}

GoalChanger.propTypes = {
    allowExpandHeader: React.PropTypes.bool.isRequired,
    initiallyExpanded: React.PropTypes.bool.isRequired,
    expandHeaderText: React.PropTypes.string.isRequired,

    onGoalAccepted: React.PropTypes.func.isRequired,
    onChangeDiscarded: React.PropTypes.func.isRequired,

    originalGoal: React.PropTypes.object.isRequired,

    acceptLabel: React.PropTypes.node.isRequired,
    discardLabel: React.PropTypes.node.isRequired,
}
