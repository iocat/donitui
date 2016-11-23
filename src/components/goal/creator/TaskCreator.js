// @flow
import React from 'react';
import {SingleTaskEditor, TaskEditorState} from './SingleTaskEditor';
import {Divider} from 'material-ui';
import {TaskStatus} from '../../../data/index';
import type {Task} from '../../../data/types';
import ActionDone from 'material-ui/svg-icons/action/done';

const emptyTask= ():Task=> {
    return {
        name:"",
        status: TaskStatus.NOT_DONE,
        reminder:{
            remindAt: new Date(),
            duration: 0,
        }
    }
}

type Props = {
    tasks: Task[],
}

export default class TaskCreator extends React.Component{
    state:{
        // staged the changes to the tasks
        // the last task is always the newly created task
        stagedTasks: Task[],
    }
    constructor(props:Props){
        super(props);
        let tasks = props.tasks.slice();
        tasks.push(emptyTask());
        this.state = {
            stagedTasks: tasks,
        }
        console.log(this.state.stagedTasks);
    }

    stageFunc = (index: number) => {
        return (task:Task) =>{
            let stagedTasks: Task[] = this.state.stagedTasks.slice();
            stagedTasks[index] = task;
            this.setState({stagedTasks: stagedTasks});
        }
    }

    acceptFunc = (index: number) =>{
        return ()=>{
            let stagedTasks: Task[] = this.state.stagedTasks.slice();
            if (index === stagedTasks.length-1){
                stagedTasks.push(emptyTask());
            }
            this.props.replaceTask(index, this.state.stagedTasks[index]);
            this.setState({stagedTasks: stagedTasks});
        }
    }

    render(){
        let tasks = this.state.stagedTasks;
        return (
            <div>
                {tasks.map((task, index) => {
                    if (index === tasks.length-1){
                        return (
                            <div className="task-creator" key={index}>
                                    <SingleTaskEditor
                                        task={tasks[index]}
                                        initState={TaskEditorState.EDITING}
                                        stageTask={this.stageFunc(index)}
                                        acceptTask={this.acceptFunc(index)}
                                        />
                                    <Divider/>
                                    </div>)
                    }
                    return (
                        <div className="task-creator" key={index}>
                                <SingleTaskEditor
                                    task={tasks[index]}
                                    initState={TaskEditorState.PREVIEW}
                                    stageTask={this.stageFunc(index)}
                                    acceptTask={this.acceptFunc(index)}
                                    acceptBtn={<ActionDone/>}
                                    />
                                <Divider/>
                                </div>)
                })}
            </div>
        )
    }
}

TaskCreator.propTypes = {
    tasks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    // (index:number, task: Task)
    replaceTask: React.PropTypes.func.isRequired,
}
