import React from 'react';
import {SingleTaskEditor} from './SingleTaskEditor';
import {CardText} from 'material-ui/Card';

export default class TaskCreator extends React.Component{
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
