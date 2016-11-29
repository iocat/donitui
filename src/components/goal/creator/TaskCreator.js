// @flow
import React from 'react';
import {SingleTaskEditor, TaskEditorState} from './SingleTaskEditor';
import {Divider} from 'material-ui';
import {TaskStatus} from '../../../data/index';
import type {Task} from '../../../data/types';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TaskAddButton from './TaskAddButton';
const emptyTask = () : Task => {
    return {
        name: "",
        status: TaskStatus.NOT_DONE,
        reminder: {
            remindAt: new Date(),
            duration: 0
        }
    }
}

type Props = {
    tasks: Task[]
}


export const randomizeTaskKey= ()=>{
    return new Date().getTime()+Math.floor(Math.random()*100000);
}

export default class TaskCreator extends React.Component {
    state : {
        // staged the changes to the tasks
        // the last task is always the newly created task
        stagedTasks: Task[],
        timestamps: number[],
        addTriggered: boolean
    }
    constructor(props : Props) {
        super(props);
        let tasks = props.tasks.slice();
        tasks.push(emptyTask());
        let timestamps = tasks.map(()=> randomizeTaskKey());
        this.state = {
            stagedTasks: tasks,
            addTriggered: false,
            timestamps: timestamps,
        }
    }

    stageFunc = (index : number) => {
        return (task : Task) => {
            let stagedTasks : Task[] = this.state.stagedTasks.slice();
            stagedTasks[index] = task;
            this.setState({stagedTasks: stagedTasks});
        }
    }

    acceptFunc = (index : number) => {
        return () => {
            let stagedTasks : Task[] = this.state.stagedTasks.slice();
            let timest: number[] = this.state.timestamps.slice();
            if (index === stagedTasks.length - 1) {
                stagedTasks.push(emptyTask());
                timest.push(randomizeTaskKey());
                this.setState({addTriggered: false});
            }
            this.props.replaceTask(index, this.state.stagedTasks[index]);
            this.setState({stagedTasks: stagedTasks, timestamps: timest});
        }
    }

    deleteFunc = (index: number) =>{
        return ()=>{
            let stagedTasks: Task[] = this.state.stagedTasks.slice();
            let timest: number[] = this.state.timestamps.slice();
            if (index === stagedTasks.length - 1) {
                this.setState({addTriggered: false});
                return ;
            }
            this.props.removeTask(index);
            stagedTasks.splice(index,1);
            timest.splice(index,1);
            this.setState({stagedTasks: stagedTasks, timestamps: timest});
        }
    }

    stageNewOne = () => {
        this.setState({addTriggered: true});
    }

    render() {
        let tasks = this.state.stagedTasks;
        let timest = this.state.timestamps;
        return (
            <div>
                {tasks.map((task, index) => {
                    if (index === tasks.length - 1) {
                        if (this.state.addTriggered ) {
                            return (
                                <div className="task-creator new-task" key={timest[index]}>
                                    <SingleTaskEditor task={task} initState={TaskEditorState.EDITING} stageTask={this.stageFunc(index)} acceptTask={this.acceptFunc(index)} acceptBtn={<ContentAdd/>} deleteTask={this.deleteFunc(index)}/>
                                    <Divider/>
                                </div>
                            )
                        } else {
                            return <div key={timest[index]}>
                                <TaskAddButton onTouchTap={this.stageNewOne}/>
                                <Divider/>
                            </div>
                        }
                    }
                    return (
                        <div className="task-creator" key={timest[index]}>
                            <SingleTaskEditor task={task} initState={TaskEditorState.PREVIEW} stageTask={this.stageFunc(index)} acceptTask={this.acceptFunc(index)} acceptBtn={<ActionDone/>} deleteTask={this.deleteFunc(index)}/>
                            <Divider/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

TaskCreator.propTypes = {
    tasks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    // (index:number, task: Task)
    replaceTask: React.PropTypes.func.isRequired,
    removeTask: React.PropTypes.func.isRequired,
}
