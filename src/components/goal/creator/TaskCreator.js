import React from 'react';
import ToDoList from '../card/ToDoList';
import {SingleTaskEditor} from './SingleTaskEditor';
import {List} from 'material-ui/List';
import {CardText} from 'material-ui/Card';
export default class TaskCreator extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <CardText className="task-creator">
                    <SingleTaskEditor addTask={this.props.addTask} />
                    </CardText>
                </div>
        )
    }
}

TaskCreator.propTypes = {
    tasks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    addTask: React.PropTypes.func.isRequired,
}