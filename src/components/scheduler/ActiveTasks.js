// @flow

var React = require("react");

import FloatingCard from '../utils/FloatingCard';
import { CardText, List, ListItem } from 'material-ui';
import {connect} from 'react-redux';
import ActionToday from 'material-ui/svg-icons/action/today';
import type {ActiveTask, RootReducer}
from '../../data/reducers';
import {readableDuration} from '../../timeutils';

type WithEndTime = {
    name: string,
    goalId: number,
    isHabit: boolean,
    id: number,
    endTime: number
}

type Props = {
    todos: WithEndTime[],
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
        let todos: WithEndTime[] = this.props.todos;
        if (todos.length === 0) {
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
                    todos.map((todo: WithEndTime, index: number)=>{
                        return(
                            <ListItem key={index} primaryText={""+todo.name}
                                secondaryText={"ends in " + readableDuration(todo.endTime-now)}
                                disabled/>
                        )
                    })
                }
            </List>
        }
    }
    render() {
        let title: string = "Active Tasks";
        if (this.props.todos.length === 1){
            title = "Active Task"
        }
        return <FloatingCard iconHeader={< ActionToday />} iconTitle={title}>
            {this.getTaskList()}
        </FloatingCard >
    }
}

_ActiveTasks.propTypes = {
    todos: React.PropTypes.array.isRequired,
    now: React.PropTypes.number.isRequired,
}

const mapStateToProps = (rootReducer :  RootReducer) : Props => {
    let active :  ActiveTask[] = rootReducer.goalTracking.scheduler.activeTasks,
        todos : WithEndTime[] = [];
    for (let todo of active) {
        if (todo.isHabit){
            todos.push(Object.assign({}, todo, {
                name: rootReducer.goalTracking.goals[todo.goalId].habits[todo.id].name,
            }));
        }else {
            todos.push(Object.assign({}, todo, {
                name: rootReducer.goalTracking.goals[todo.goalId].tasks[todo.id].name,
            }));
        }
    }
    return {now: rootReducer.goalTracking.scheduler.now, todos: todos};
}

export default connect(mapStateToProps)(_ActiveTasks);
