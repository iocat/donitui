// @flow

var React = require("react");
import {CardText} from 'material-ui';
import FloatingCard from '../utils/FloatingCard';
import {connect} from 'react-redux';
import ToDoList from '../goal/card/ToDoList';
import type {Goal, Task}
from '../../data/types';
import {TaskStatus} from '../../data/index';
import type {$RootReducer}
from '../../data/reducers';

const activeTasks = (goals : Goal[]) : Task[] => {
    let tasks : Task[] = [];
    for (let goal of goals) {
        for (let task of goal.tasks) {
            if (task.status === TaskStatus.IN_PROGRESS) {
                tasks.push(task);
            }
        }
    }
    return tasks;
}

type Props = {
    inProgressGoals: Goal[]
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
    render() {
        let ipgs : Goal[] = this.props.inProgressGoals;
        if (ipgs.length === 0) {
            return <FloatingCard>
                <CardText >
                    {"What to do now:"}
                </CardText>
                <CardText style={{textAlign:"center"}}>
                    You are done for today. Have a cup of tea!
                </CardText>
            </FloatingCard>
        }
        return <FloatingCard >
            <CardText >
                {"What to do now:"}
            </CardText>
            <ToDoList tasks={activeTasks(ipgs)}/>
        </FloatingCard >
    }
}

_ActiveTasks.propTypes = {
    inProgressGoals: React.PropTypes.arrayOf(React.PropTypes.object)
}

const mapStateToProps = (rootReducer : $RootReducer) : Props => {
    let ipgids : string[] = rootReducer.goalTracking.inProgress,
        goals : Goal[] = [];
    for (let i of ipgids) {
        goals.push(rootReducer.goalTracking.goals[i]);
    }
    return {inProgressGoals: goals, nextEvent: null}
}

export default connect(mapStateToProps)(_ActiveTasks);
