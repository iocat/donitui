// @flow
import React from 'react';

import TodoListEditor from './TodoListEditor';
import FloatingCard from '../../utils/FloatingCard';
import {FlatButton, CardActions, TextField, CardText } from 'material-ui';
import HeaderWithIcon from '../../utils/HeaderWithIcon';

import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import EditorInsertInvitation from 'material-ui/svg-icons/editor/insert-invitation';

import type {Goal, Habit, Task} from '../../../data/types';

type Props = {
    title: string,
    initGoal: Goal,
    accept: (g: Goal) => void,
    discard: ()=>void,
    acceptLabel: string,
    discardLabel: string,
}

function invalidName(name: string): boolean{
    return name.length === 0 || name.length >60
}
function invalidDesc(desc: string) :boolean{
    return desc.length > 200
}

function invalidTodo(goal: Goal) : boolean{
    return (goal.tasks.length + goal.habits.length) === 0
}

export default class GoalEditor extends React.Component{
    state: {
        goal: Goal,
        nameChanged: boolean,
        descChanged: boolean,
        todoChanged: boolean,
    }
    constructor(props: Props) {
        super(props);
        this.state = {
            goal: props.initGoal,
            nameChanged: false,
            descChanged: false,
            todoChanged: false,
        }
    }

    onAccept = ()=>{
        this.props.accept(this.state.goal);
    }
    onDiscard = ()=>{
        this.props.discard(this.state.goal);
    }
    getButtons = () =>{
        return [<FlatButton key="discard-btn"
                        className="goal-control-action btn"
                        onTouchTap={this.onDiscard}
                        label={this.props.discardLabel}/>,
                <FlatButton key="create-btn"
                    className="goal-control-action btn"
                    onTouchTap={this.decorateDataCheck(this.onAccept)}
                    primary={true} label={this.props.acceptLabel}/>
                ];
    }
    onSetName = (_: any, newName: string) =>{
        this.setState({
            nameChanged: true,
            goal: Object.assign({}, this.state.goal, {name: newName}),
        })
    }
    onSetDesc = (_: any, newDesc: string) =>{
        this.setState({
            descChanged: true,
            goal: Object.assign({}, this.state.goal, {description: newDesc}),
        })
    }
    onSetTasks = (tasks: Task[]) =>{
        this.setState({
            todoChanged: true,
            goal: Object.assign({}, this.state.goal, {tasks: tasks}),
        })
    }
    onSetHabits = (habits: Habit[])=>{
        this.setState({
            todoChanged: true,
            goal: Object.assign({}, this.state.goal, {habits: habits}),
        })
    }
    getNameError = ():?string=>{
        if(this.state.nameChanged && invalidName(this.state.goal.name)){
            return "Your goal's name should be in between 0 and 60 characters"
        }
        return null
    }
    getDescError = ():?string=>{
        if( this.state.descChanged && invalidDesc(this.state.goal.description)){
            return "Your description should be less than 200 characters"
        }
        return null
    }
    getTodoError = ():?string=>{
        if( this.state.todoChanged && invalidTodo(this.state.goal)){
            return "You should have at least one thing to do to achieve this goal"
        }
        return null;
    }
    decorateDataCheck = (confirmFn: ()=>void)=>{
        return ()=>{
            if(invalidName(this.state.goal.name)){
                this.setState({nameChanged: true})
                return
            }
            if(invalidDesc(this.state.goal.description)){
                this.setState({descChanged: true})
                return
            }
            if(invalidTodo(this.state.goal)){
                this.setState({todoChanged:true})
                return
            }
            confirmFn();
        }
    }
    render(){
        let goal: Goal = this.state.goal;
        return <FloatingCard className="goal-card goal-changer">
            <HeaderWithIcon icon={<EditorModeEdit/>} title={this.props.title}/>
            <CardText>
                <TextField errorText={this.getNameError()} hintText="What do you want to do?" floatingLabelText="Goal" floatingLabelFixed={true} fullWidth={true} value={goal.name} onChange={this.onSetName} />
                <TextField errorText={this.getDescError()} hintText="Add some more details?" floatingLabelFixed={true} floatingLabelText="Description" fullWidth={true} multiLine={true} value={goal.description} onChange={this.onSetDesc}/>
                </CardText>
            <HeaderWithIcon icon={<EditorInsertInvitation/>} title={"Habits and Tasks"}/>
            <CardText>
                <p style={{color:"red"}}>{this.getTodoError()}</p>
                <TodoListEditor initTasks={goal.tasks} initHabits={goal.habits} onChangeTasks={this.onSetTasks} onChangeHabits={this.onSetHabits} />
                </CardText>
            <CardActions className="goal-actions">{this.getButtons()}</CardActions>
        </FloatingCard>
    }
    static defaultProps: {
        title: string,
        acceptLabel: string,
        discardLabel: string,
    }

}

GoalEditor.defaultProps = {
    title: "Create A Goal",
    acceptLabel: "Create",
    discardLabel: "Discard",
}

GoalEditor.propTypes = {
    title: React.PropTypes.string,

    initGoal: React.PropTypes.object.isRequired,
    accept: React.PropTypes.func.isRequired,
    discard: React.PropTypes.func.isRequired,

    acceptLabel: React.PropTypes.string,
    discardLabel: React.PropTypes.string,
}
