// @flow

var React = require("react");

import FloatingCard from '../utils/FloatingCard';
import { CardText, List, ListItem } from 'material-ui';
import {connect} from 'react-redux';
import ActionToday from 'material-ui/svg-icons/action/today';
import type {$ActiveTask, $RootReducer}
from '../../data/reducers';
import {readableDuration} from '../../timeutils';

type TaskWithEndTime = {
    name: string,
    goalId: string,
    taskId: number,
    endTime: number
}

type Props = {
    tasks: TaskWithEndTime[],
    now: number
}

class _ActiveTasks extends React.Component {
    props : Props
    state : {
        depth: number;
    }
    constructor() {
        super();
        this.state = {
            depth: 1
        };
    }
    onMouseOver = () => {
        this.setState({depth: 2})
    }
    onMouseOut = () => {
        this.setState({depth: 1})
    }
    getTaskList = ()=>{
        let tasks: TaskWithEndTime[] = this.props.tasks;
        if (tasks.length === 0) {
            return <div>
                <CardText style={{
                    textAlign: "center"
                }}>
                    You are done for now.
                </CardText>
            </div>
        } else {
            let now: any = this.props.now;
            return <List>
                {
                    tasks.map((task: TaskWithEndTime, index: number)=>{
                        return(
                            <ListItem key={index} primaryText={""+task.name}
                                secondaryText={"ends in " + readableDuration(task.endTime-now)}
                                disabled/>
                        )
                    })
                }
            </List>
        }
    }
    render() {
        let title: string = "Active Tasks";
        if (this.props.tasks.length === 1){
            title = "Active Task"
        }
        return <FloatingCard iconHeader={< ActionToday />} iconTitle={title}>
            {this.getTaskList()}
        </FloatingCard >
    }
}

_ActiveTasks.propTypes = {
    tasks: React.PropTypes.array.isRequired,
    now: React.PropTypes.number.isRequired,
}

const mapStateToProps = (rootReducer : $RootReducer) : Props => {
    let active : $ActiveTask[] = rootReducer.goalTracking.scheduler.activeTasks,
        tasks : TaskWithEndTime[] = [];
    for (let task of active) {
        tasks.push(Object.assign({}, task, {
            name: rootReducer.goalTracking.goals[task.goalId].tasks[task.taskId].name,
        }));
    }
    return {now: rootReducer.goalTracking.scheduler.now, tasks: tasks};
}

export default connect(mapStateToProps)(_ActiveTasks);
